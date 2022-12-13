import { RedisClientType } from 'redis';

export interface IEventHandler<T> {
  key: string;
  handler: (_msg: string, _client: RedisClientType) => T;
}
