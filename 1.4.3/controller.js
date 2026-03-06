import { lockSeatRedis, confirmSeatRedis, releaseSeatRedis } from "./seatLockService.js"

const seats = Array.from({ length: 30 }, (_, i) => ({
  id: `S${i + 1}`,
  status: "available"
}))

export const getSeats = (req, res) => {
  res.json(seats)
}

export const lockSeat = async (req, res) => {

  const { seatId, userId } = req.body

  const seat = seats.find(s => s.id === seatId)

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" })
  }

  if (seat.status === "booked") {
    return res.status(400).json({ message: "Seat already booked" })
  }

  const locked = await lockSeatRedis(seatId, userId)

  if (!locked) {
    return res.status(409).json({ message: "Seat already locked by another user" })
  }

  seat.status = "locked"

  res.json({ message: "Seat locked", seat })
}

export const confirmSeat = async (req, res) => {

  const { seatId, userId } = req.body

  const seat = seats.find(s => s.id === seatId)

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" })
  }

  const confirmed = await confirmSeatRedis(seatId, userId)

  if (!confirmed) {
    return res.status(403).json({ message: "Lock not owned by this user" })
  }

  seat.status = "booked"

  res.json({ message: "Seat booked successfully", seat })
}

export const releaseSeat = async (req, res) => {

  const { seatId, userId } = req.body

  const seat = seats.find(s => s.id === seatId)

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" })
  }

  await releaseSeatRedis(seatId, userId)

  seat.status = "available"

  res.json({ message: "Seat released", seat })
}
