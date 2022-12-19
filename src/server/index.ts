require('dotenv').config();

import { Server, ServerCredentials } from '@grpc/grpc-js';
import { createClient, RedisClientType } from 'redis';
import swap from '../grpc';
import { SwapHandlers } from '../proto/swap/Swap';
import { Token__Output } from '../proto/swap/Token';
import { TradingPair__Output } from '../proto/swap/TradingPair';
import { TxStatus } from '../proto/swap/TxStatus';
import { DynamicKey, StaticKey } from '../redis/IEventHandler';
import LiquidityChangeEvent from '../redis/LiquidityChangeEventHandler';
import OrderEventHandler from '../redis/OrderEventHandler';
import { grpc_server_log, redis_log } from '../utils/print';
import { isValid, keyForPair } from '../utils/token';

const PORT = process.env.GRPC_PORT || 4001;
const server = new Server();
let client: RedisClientType | undefined = undefined;

const PENDING_ORDERS: Set<String> = new Set();
const LIQUIDITY_CACHE: { [key: string]: TradingPair__Output } = {};
const updateCache = (pair?: [Token__Output, Token__Output]) => {
  if (!pair) return;
  grpc_server_log(`Pool Update: ${keyForPair(pair)}`);
  LIQUIDITY_CACHE[keyForPair(pair)] = { a: pair[0], b: pair[1] };
};

server.addService(swap.Swap.service, {
  Init: (req, res) => {
    const tokens = req.request.tokens;
    if (tokens && tokens.length > 0) {
      const keys = Object.keys(LIQUIDITY_CACHE).filter(
        (k) => tokens.indexOf(k) >= 0
      );
      const result: TradingPair__Output[] = [];
      for (const key in keys) {
        result.push(LIQUIDITY_CACHE[key]);
      }
      res(null, { pairs: result });
    } else {
      res(null, { pairs: Object.values(LIQUIDITY_CACHE) });
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
    subscriber.subscribe(LiquidityChangeEvent.key as StaticKey, (msg) =>
      LiquidityChangeEvent.handler(msg, client!).then((pair) => {
        if (!pair) {
          subscriber.disconnect().catch(console.error);
          return;
        }

        if (
          !tokens ||
          (tokens && tokens.filter((t) => t === keyForPair(pair)))
        ) {
          call.write({
            a: pair[0],
            b: pair[1],
          });
        }
      })
    );
  },
  OrderStatus: async (call) => {
    const txHash = call.request.txHash;
    if (!txHash || txHash.length === 0) {
      call.end({ status: TxStatus.INVALID });
      return;
    }

    if (PENDING_ORDERS.has(txHash.toString())) {
      call.write({ status: 'PENDING_BATCHING' });
    }
    // ToDo
  },
  Swap: (req, res) => {
    const tokenA = req.request.pair?.a;
    const tokenB = req.request.pair?.b;
    if (!isValid(tokenA, true) || !isValid(tokenB)) {
      res(new Error('Missing valid arguments for swap pair'));
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

    await client.connect();

    // Observe Orders by default
    for (const addr in (process.env.ORDER_ADDRS || '').split(',')) {
      client?.subscribe((OrderEventHandler.key as DynamicKey)(addr), (msg) => {
        OrderEventHandler.handler(msg, client!)
          .then((result) => {
            grpc_server_log(
              `${result.isNew ? 'Added' : 'Removed'}:\n\t${result.txHashes.join(
                '\n\t'
              )}`
            );
            if (result.isNew) {
              result.txHashes.forEach((h) => PENDING_ORDERS.add(h));
            } else {
              result.txHashes.forEach((h) => PENDING_ORDERS.delete(h));
            }
          })
          .catch((e) => console.error(e));
      });
    }

    // Listener for cache updates to serve init grpc calls
    client!.subscribe(LiquidityChangeEvent.key as StaticKey, (msg) =>
      LiquidityChangeEvent.handler(msg, client!)
        .then(updateCache)
        .catch((e) => console.log(e))
    );
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
