import { createClient } from "redis"

let redisClient

export default async function connectRedis() {

  try {

    redisClient = createClient({
      url: process.env.REDIS_URL
    })

    redisClient.on("error", (err) => {
      console.log("Redis error:", err)
    })

    await redisClient.connect()

    console.log("Redis connected")

  } catch (err) {

    console.log("Redis connection failed")

  }

}

export { redisClient }
