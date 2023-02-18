import { createClient, RedisClientType } from "redis";

export const redisClient : RedisClientType = createClient({legacyMode: true});
