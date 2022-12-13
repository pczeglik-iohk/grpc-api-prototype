import { redis_log } from '../utils/print';
import { RedisEventListener } from './listener';

const blockListener: RedisEventListener<Promise<[string, string]>> = {
  key: '__keyevent@0__:set',
  handler: async (msg, client) => {
    if (msg === '_cursor') {
      const cursor = await client.get('_cursor');

      if (cursor) {
        const parts = cursor.split(',');
        redis_log(`New Block: ${parts[1]}`);
        return Promise.resolve([cursor[0], cursor[1]]);
      }
    } else {
      redis_log(msg, 'Unknown');
    }

    return Promise.reject();
  },
};

export default blockListener;
