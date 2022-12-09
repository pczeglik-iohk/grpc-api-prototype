
import Big from "big.js";
import { createClient } from "redis";


const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err: any) => console.log('Redis Client Error', err));
client.on('connect', function () {
  console.log('Connected');
});
client.on('disconnect', () => {
  console.log('Disconnected');
});



async function consumer(): Promise<void> {
  await client.connect();

  const cursorSubscriber = client.duplicate();
  await cursorSubscriber.connect();

  const subscriber = client.duplicate();
  await subscriber.connect();

  cursorSubscriber
    .subscribe('__keyevent@0__:set', async msg => {
      if (msg === '_cursor') {
        const cursor = await client.get('_cursor');
        console.log(`[Block] New: ${cursor?.split(',')[1] || ''}`);
      } else {
        console.log(`[Unknown]: ${msg}`);
      }
    })
    .then(() => console.log('Subscribed to chain tip'))
    .catch(console.error);
  
  subscriber
    .subscribe('__keyevent@0__:sadd', async msg => {
      if (msg.indexOf('.order.') >= 0) {
        console.log('[Order] New');
      } else if (msg.indexOf('.pool.') >= 0) {
        const parts = msg.split('.');
        let tokenA: string, tokenB: string;
        tokenB = parts[parts.length - 1];
        tokenA = msg.indexOf(':') >= 0 ? parts[3] : 'ADA'; // 
        const amounts = (await client.sMembers(msg))?.at(0)?.split(':') || [];
        if (amounts.length > 0) {
          console.log(`[Pool] ${tokenA}/${tokenB}: Price ${Big(amounts[0]).div(Big(amounts[1]))}`);
        }
      } else {
        console.log(`[Unknown]: ${msg}`);
       }
    })
    .then(() => console.log('Subscribed to minswap order and pool updates'))
    .catch(console.error);
}

consumer();