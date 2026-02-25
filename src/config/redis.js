import { createClient } from "redis";

export const pubClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

export const subClient = pubClient.duplicate();

export const connectRedis = async () => {
    try {
        await pubClient.connect();
        await subClient.connect();
        console.log("Redis connected");
    } catch (error) {
        console.error("Redis connection error:", error);
    }
};
