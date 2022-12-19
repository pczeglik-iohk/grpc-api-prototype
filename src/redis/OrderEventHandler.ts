import { CACHE } from '../server';
import { redis_log } from '../utils/print';
import { IEventHandler } from './IEventHandler';

export interface IOrderEventHandlerResponse {
  isNew: boolean;
  txHashes: string[];
}

const OrderEventHandler: IEventHandler<Promise<IOrderEventHandlerResponse>> = {
  key: (addr) => `__keyspace@0__:${addr}`,
  handler: async (msg, client) => {
    const parts = msg.split(':');
    const isNewOrder = parts[0] === 'sadd';
    const query = client.duplicate();
    await query.connect();

    const currentTxOutRefs = await query.sMembers(parts[1]);
    let deltaRefs: string[] = [];
    if (isNewOrder) {
      deltaRefs = currentTxOutRefs.filter((u) => !CACHE.orders.has(u));
    } else {
      CACHE.orders.forEach((u) => {
        if (!currentTxOutRefs.includes(u)) {
          deltaRefs.push(u);
        }
      });
    }
    CACHE.orders = new Set(currentTxOutRefs);
    return query.disconnect().then((_) =>
      Promise.resolve({
        isNew: isNewOrder,
        txHashes: deltaRefs,
      })
    );
  },
};

export default OrderEventHandler;
