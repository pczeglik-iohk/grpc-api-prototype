import { redis_log } from '../utils/print';
import { IEventHandler } from './IEventHandler';

const BlockEventHandler: IEventHandler<Promise<[string, string]>> = {
  key: '__keyevent@0__:set',
  handler: async (msg, client) => {
    const query = client.duplicate();
    await query.connect();

    if (msg === '_cursor') {
      const cursor = await client.get('_cursor');

      if (cursor) {
        const parts = cursor.split(',');
        redis_log(`New Block: ${parts[1]}`);
        return query
          .disconnect()
          .then((_) => Promise.resolve([cursor[0], cursor[1]]));
      }
    } else {
      redis_log(msg, 'Unknown');
    }

    return query.disconnect().then((_) => Promise.reject());
  },
};

export default BlockEventHandler;
