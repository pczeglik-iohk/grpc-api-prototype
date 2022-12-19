import { redis_log } from '../utils/print';
import { IEventHandler } from './IEventHandler';

let orderTxOutRefs: string[] = [];

export interface IOrderEventHandlerResponse {
  isNew: boolean;
  txHashes: string[];
}

const OrderEventHandler: IEventHandler<Promise<IOrderEventHandlerResponse>> = {
  key: (addr) => `__keyspace@0__:minswap.order.${addr}`,
  handler: async (msg, client) => {
    const isNewOrder = msg === 'sadd';
    const query = client.duplicate();
    await query.connect();

    const currentTxOutRefs = await query.SMEMBERS(msg);
    let deltaRefs: string[] = [];
    if (isNewOrder) {
      deltaRefs = currentTxOutRefs.filter((u) => !orderTxOutRefs.includes(u));
      redis_log(`${deltaRefs.length} New Orders`);
    } else {
      deltaRefs = orderTxOutRefs.filter((u) => !currentTxOutRefs.includes(u));
      redis_log(`${deltaRefs.length} Removed Orders`);
    }
    return query.disconnect().then((_) =>
      Promise.resolve({
        isNew: isNewOrder,
        txHashes: deltaRefs,
      })
    );
  },
};

export default OrderEventHandler;
