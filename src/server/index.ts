require('dotenv').config();

import { Server, ServerCredentials } from '@grpc/grpc-js';
import { createClient, RedisClientType } from 'redis';
import swap from '../grpc';
import { SwapHandlers } from '../proto/swap/Swap';
import { SwapResponse__Output } from '../proto/swap/SwapResponse';
import { Token__Output } from '../proto/swap/Token';
import liquidityListener from '../redis/liquidity';
import { grpc_server_log, redis_log } from '../utils/print';

const PORT = process.env.GRPC_PORT || 4001;
const server = new Server();
let client: RedisClientType | undefined = undefined;

const CACHE: { [key: string]: SwapResponse__Output } = {};
const updateCache = (pair?: [Token__Output, Token__Output]) => {
  if (!pair) return;
  grpc_server_log(`Pool Update: ${keyForPair(pair)}`);
  CACHE[keyForPair(pair)] = { a: pair[0], b: pair[1] };
};

const keyForPair = (pair: [Token__Output, Token__Output]) => {
  if (pair[0].policy === '') {
    return `${pair[1].policy!}.${pair[1].name!}`;
  } else {
    return `${pair[0].policy!}.${pair[0].name!}:${pair[1].policy!}.${pair[1]
      .name!}`;
  }
};

server.addService(swap.Swap.service, {
  Init: (req, res) => {
    const tokens = req.request.tokens;
    if (tokens && tokens.length > 0) {
      const keys = Object.keys(CACHE).filter((k) => tokens.indexOf(k) >= 0);
      const result: SwapResponse__Output[] = [];
      for (const key in keys) {
        result.push(CACHE[key]);
      }
      res(null, { pairs: result });
    } else {
      res(null, { pairs: Object.values(CACHE) });
    }
  },
  Liquidity: async (call) => {
    const subscriber = client?.duplicate();
    if (!subscriber) {
      call.destroy(
        new Error('Internal Error - No Redis connection available.')
      );
      return;
    }

    await subscriber.connect();
    const tokens = call.request.tokens;
    subscriber.subscribe(liquidityListener.key, (msg) =>
      liquidityListener.handler(msg, client!).then((pair) => {
        if (!pair) return;
        if (
          !tokens ||
          (tokens && tokens.filter((t) => t === keyForPair(pair)).length > 0)
        ) {
          call.write({
            a: pair[0],
            b: pair[1],
          });
        }
        // call.end();
      })
    );
  },
} as SwapHandlers);

server.bindAsync(
  `0.0.0.0:${PORT}`,
  ServerCredentials.createInsecure(),
  async (err, port) => {
    if (err) {
      console.error(err);
      return;
    }

    grpc_server_log(`Server is running on 0.0.0.0:${port}`);

    client = createClient({ url: process.env.REDIS_URL });
    client
      .on('error', (err) => {
        redis_log(err, 'Error');
        exit();
      })
      .on('connect', () => {
        redis_log('Listening');
        server.start();
      })
      .on('disconnect', () => {
        redis_log('Disconnected');
        exit();
      });
    const subscriber = client.duplicate();

    Promise.all([client.connect(), subscriber.connect()]).then(() => {
      // Listener for cache updates to facilitate init grpc calls
      client!.subscribe(liquidityListener.key, (msg) =>
        liquidityListener
          .handler(msg, subscriber)
          .then(updateCache)
          .catch((e) => console.log(e))
      );
    });
  }
);

const exit = () => {
  client?.disconnect();
  server.tryShutdown((err) => {
    if (err) {
      console.error(`Error shutting down server: ${err}`);
    }
  });
};
