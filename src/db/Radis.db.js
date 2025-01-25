import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();
// Create a new redis client
import {
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_HOST,
  REDIS_PORT,
} from "../constants.js";


const redisClient = redis.createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});


redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.connect();

export default redisClient;