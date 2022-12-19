require('dotenv').config();

import { credentials } from '@grpc/grpc-js';
import swap from '../grpc';
import { SwapResponse } from '../proto/swap/SwapResponse';
import { TradingPair__Output } from '../proto/swap/TradingPair';
import { grpc_client_log } from '../utils/print';

const client = new swap.Swap(
  `0.0.0.0:${process.env.GRPC_PORT || 4001}`,
  credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  grpc_client_log('Connected to server');

  const errorHandler = (err: Error) => grpc_client_log(err.message);
  const liquidityStream = client.Liquidity({}); // no token filters passed
  liquidityStream
    .on('error', errorHandler)
    .on('data', (pair: TradingPair__Output) => {
      grpc_client_log(`Liquidity Change:`);
      grpc_client_log(
        `(${pair.a?.name}/${pair.b?.name}): Price ${pair.a?.amount?.div(
          pair.b!.amount!
        )}`
      );
    })
    .on('end', () => grpc_client_log(`Disconnected`));

  const tokens: string[] = [];
  client
    .Init({ tokens }, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }

      if (!res?.pairs) {
        grpc_client_log(`No liquidity for [${tokens}]`);
        return;
      }
      grpc_client_log('Init Liquidity');
      res?.pairs?.forEach((pair) => {
        grpc_client_log(
          `(${pair.a?.name}/${pair.b?.name}): Price ${pair.a?.amount?.div(
            pair.b!.amount!
          )}`
        );
      });
    })
    .on('error', errorHandler);
});
