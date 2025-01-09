import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

export const redisStorage = createStorage({
  driver: redisDriver({
    base: "pol-erfx",
    host: process.env.REDIS_HOST,
    //tls: true,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  }),
});
