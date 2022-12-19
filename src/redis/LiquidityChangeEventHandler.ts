import Big from 'big.js';
import Long from 'long';
import { Token__Output } from '../proto/swap/Token';
import { redis_log } from '../utils/print';
import { IEventHandler } from './IEventHandler';

const LiquidityChangeEvent: IEventHandler<
  Promise<[_a: Token__Output, _b: Token__Output] | undefined>
> = {
  key: '__keyevent@0__:sadd',
  handler: async (msg, client) => {
    if (!msg.startsWith('pool.')) {
      return Promise.resolve(undefined);
    }

    const query = client.duplicate();
    await query.connect();
    const parts = msg.split('.');
    let token_a_name: string,
      token_b_name: string,
      token_a_policy: string,
      token_b_policy: string;
    let token_a_amount = Big(0),
      token_b_amount = Big(0);
    if (msg.indexOf(':') >= 0) {
      token_a_name = parts[2];
      token_a_policy = parts[1];
    } else {
      token_a_name = 'ADA';
      token_a_policy = '';
    }

    token_b_name = parts[parts.length - 1];
    token_b_policy = parts[parts.length - 2];

    const members = await query.sMembers(msg);
    if (members.length > 2) {
      console.warn('Found more than 2 liquidity sources');
      if (token_a_policy === '') {
        console.debug(`pool.${token_b_policy}.${token_b_name}`);
      } else {
        console.debug(
          `pool.${token_a_policy}.${token_a_name}:${token_b_policy}.${token_b_name}`
        );
      }
    }
    for (const member of members) {
      const parts = member.split(':');

      token_a_amount = token_a_amount.add(Big(parts[1]));
      token_b_amount = token_b_amount.add(Big(parts[2]));

      redis_log(
        `${parts[0].toUpperCase()} DEX - ${token_a_name}/${token_b_name}: New Price ${Big(parts[1]).div(Big(parts[2]))}`
      );
    }

    return query.disconnect().then((_) =>
      Promise.resolve([
        {
          name: token_a_name,
          policy: token_a_policy,
          amount: Long.fromString(token_a_amount.toString()),
        },
        {
          name: token_b_name,
          policy: token_b_policy,
          amount: Long.fromString(token_b_amount.toString()),
        },
      ])
    );
  },
};

export default LiquidityChangeEvent;
