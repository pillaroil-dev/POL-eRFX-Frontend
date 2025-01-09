import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

// Common Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
};

// Create storage instances with different base prefixes and db numbers
const createRedisStorage = (base?: string, db?: number) => createStorage({
  driver: redisDriver({ ...redisConfig, base: base, db })
});

export const GetTokenByCookieName = createRedisStorage();

// Refresh tokens in db 1
export const AuthRefreshTokenStorage = createRedisStorage("auth:refresh-token", 1);


// OTP tokens in db 2
export const OTPStorage = createRedisStorage("otp:token", 2);

// General cache in db 3
export const CacheStorage = createRedisStorage("cache", 3);