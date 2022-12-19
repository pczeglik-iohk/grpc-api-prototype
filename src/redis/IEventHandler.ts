import { RedisClientType } from 'redis';

export type StaticKey = string;
export type DynamicKey = (_part: string) => string;
export interface IEventHandler<T> {
  key: StaticKey | DynamicKey;
  handler: (_msg: string, _client: RedisClientType) => T;
}
