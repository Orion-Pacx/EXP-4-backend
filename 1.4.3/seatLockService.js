import { redisClient } from "../config/redis.js"

const LOCK_TTL = 30

export const lockSeatRedis = async (seatId, userId) => {
  const key = `seat_lock:${seatId}`

  const result = await redisClient.set(key, userId, {
    NX: true,
    EX: LOCK_TTL
  })

  return result === "OK"
}

export const confirmSeatRedis = async (seatId, userId) => {
  const key = `seat_lock:${seatId}`

  const owner = await redisClient.get(key)

  if (owner !== userId) return false

  await redisClient.del(key)

  return true
}

export const releaseSeatRedis = async (seatId, userId) => {
  const key = `seat_lock:${seatId}`

  const owner = await redisClient.get(key)

  if (owner === userId) {
    await redisClient.del(key)
  }
}
