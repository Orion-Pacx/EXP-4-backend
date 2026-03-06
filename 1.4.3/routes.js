import express from "express"
import {
  getSeats,
  lockSeat,
  confirmSeat,
  releaseSeat
} from "./controller.js"

const router = express.Router()

router.get("/seats", getSeats)

router.post("/lock-seat", lockSeat)

router.post("/confirm-seat", confirmSeat)

router.post("/release-seat", releaseSeat)

export default router
