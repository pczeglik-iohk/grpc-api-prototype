import Big from 'big.js';
import Long from 'long';
import { SwapRequest__Output } from '../proto/swap/SwapRequest';
import { Token__Output } from '../proto/swap/Token';
import { redis_log } from '../utils/print';
import { RedisEventListener } from './listener';

let orderTxIns: string[] = [];
const liquidityListener: RedisEventListener<
  Promise<[_a: Token__Output, _b: Token__Output] | undefined>
> = {
  key: '__keyevent@0__:sadd',
  handler: async (msg, client) => {
    let errorMsg: string | undefined;
    const query = client.duplicate();
    await query.connect();
    if (msg.indexOf('.order.') >= 0) {
      const allTxIns = await query.SMEMBERS(msg);
      const newTxIns = allTxIns.filter((u) => orderTxIns.indexOf(u) < 0);
      if (allTxIns.length > 0 && allTxIns.length < 1000) {
        redis_log(`${newTxIns.length} New Orders`);
      }
      if (newTxIns.length >= 1 && newTxIns.length < 10) {
        newTxIns.forEach((tx) => redis_log(`Order: ${tx}`));
      }
      orderTxIns = allTxIns;
      errorMsg = `Ignored Order ${msg}`;
    } else if (msg.indexOf('.pool.') >= 0) {
      const parts = msg.split('.');
      let token_a_name: string,
        token_b_name: string,
        token_a_policy: string,
        token_b_policy: string;
      let token_a_amount: Long, token_b_amount: Long;
      if (msg.indexOf(':') >= 0) {
        token_a_name = parts[3];
        token_a_policy = parts[2];
      } else {
        token_a_name = 'ADA';
        token_a_policy = '';
      }

      token_b_name = parts[parts.length - 1];
      token_b_policy = parts[parts.length - 2];

      const amounts = (await query.sMembers(msg))?.at(0)?.split(':') || [];
      if (amounts.length > 0) {
        redis_log(
          `${token_a_name}/${token_b_name}: Price ${Big(amounts[0]).div(
            Big(amounts[1])
          )}`
        );
      }
      token_a_amount = Long.fromString(amounts[0], true, 10);
      token_b_amount = Long.fromString(amounts[1], true, 10);
      return Promise.resolve([
        {
          name: token_a_name,
          policy: token_a_policy,
          amount: token_a_amount,
        },
        {
          name: token_b_name,
          policy: token_b_policy,
          amount: token_b_amount,
        },
      ]);
    } else {
      redis_log(msg, 'Unknown');
      errorMsg = `Unknown message ${msg}`;
    }

    return Promise.resolve(undefined);
  },
};

export default liquidityListener;
