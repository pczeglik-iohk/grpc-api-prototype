require('dotenv').config();

import { credentials } from '@grpc/grpc-js';
import swap from '../grpc';
import { SwapResponse } from '../proto/swap/SwapResponse';
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

  const liquidityStream = client.Liquidity({}); // no token filters passed
  liquidityStream
    .on('error', (err) => grpc_client_log(err.message))
    .on('data', (response: SwapResponse) => {
      grpc_client_log(`New Data:`);
      console.log(response);
    })
    .on('end', () => grpc_client_log(`Disconnected`));
});
