import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

client.on('error', (err: any) => console.log('Redis Client Error', err));
client.on('connect', function () {
  console.log('Connected');
});
client.on('disconnect', () => {
  console.log('Disconnected');
});



async function main(): Promise<void> {
  await client.connect();

  const cursorSubscriber = client.duplicate();
  await cursorSubscriber.connect();

  const subscriber = client.duplicate();
  await subscriber.connect();

  cursorSubscriber
    .subscribe('__keyevent@0__:set', async msg => {
      if (msg === '_cursor') {
        const cursor = await client.get('_cursor');
        console.log(`Tip: ${cursor}`);
      } else {
        console.log(`Unknown event: ${msg}`);
      }
    })
    .then(() => console.log('Subscribed to chain tip'))
    .catch(console.error);
  
  subscriber
    .subscribe('__keyevent@0__:sadd', async msg => {
      if (msg.indexOf('.order.') >= 0) {
        console.log('New Order Output');
      } else if (msg.indexOf('.pool.') >= 0) {
        const parts = msg.split('.');
        let tokenA: string, tokenB: string;
        tokenB = parts[parts.length - 1];
        tokenA = msg.indexOf(':') >= 0 ? parts[3] : 'ADA'; // 
        const amounts = (await client.sMembers(msg))?.at(0)?.split(':') || [];
        if (amounts.length > 0) {
          console.log(`[${tokenA}/${tokenB}] Pool: ${parseInt(amounts[0])/parseInt(amounts[1])}`);
        }
        console.log(`Amounts: ${amounts}`);
      } else {
        console.log(`Unknown event: ${msg}`);
       }
    })
    .then(() => console.log('Subscribed to minswap changes'))
    .catch(console.error);
}

main();