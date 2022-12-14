require('dotenv').config();

import { Server, ServerCredentials } from '@grpc/grpc-js';
import { createClient, RedisClientType } from 'redis';
import swap from '../grpc';
import { SwapHandlers } from '../proto/swap/Swap';
import { Token__Output } from '../proto/swap/Token';
import { TradingPair__Output } from '../proto/swap/TradingPair';
import LiquidityChangeEvent from '../redis/LiquidityChangeEventHandler';
import { grpc_server_log, redis_log } from '../utils/print';
import { isValid, keyForPair } from '../utils/token';

const PORT = process.env.GRPC_PORT || 4001;
const server = new Server();
let client: RedisClientType | undefined = undefined;

const CACHE: { [key: string]: TradingPair__Output } = {};
const updateCache = (pair?: [Token__Output, Token__Output]) => {
  if (!pair) return;
  grpc_server_log(`Pool Update: ${keyForPair(pair)}`);
  CACHE[keyForPair(pair)] = { a: pair[0], b: pair[1] };
};

server.addService(swap.Swap.service, {
  Init: (req, res) => {
    const tokens = req.request.tokens;
    if (tokens && tokens.length > 0) {
      const keys = Object.keys(CACHE).filter((k) => tokens.indexOf(k) >= 0);
      const result: TradingPair__Output[] = [];
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
    subscriber.subscribe(LiquidityChangeEvent.key, (msg) =>
      LiquidityChangeEvent.handler(msg, client!).then((pair) => {
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
  Swap: (req, res) => {
    console.log(req);
    const tokenA = req.request.pair?.a;
    const tokenB = req.request.pair?.b;
    const utxos = req.request.utxos;
    if (!isValid(tokenA, true) || !isValid(tokenB)) {
      res(new Error('Missing valid arguments for swap pair'));
      return;
    }
    if (!utxos || utxos.length === 0) {
      res(new Error('Missing utxos'), null);
      return;
    }
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
      client!.subscribe(LiquidityChangeEvent.key, (msg) =>
        LiquidityChangeEvent.handler(msg, subscriber)
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
