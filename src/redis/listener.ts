import { RedisClientType } from 'redis';

export interface RedisEventListener<T> {
  key: string;
  handler: (_msg: string, _client: RedisClientType) => T;
}
