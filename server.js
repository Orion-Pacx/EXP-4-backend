import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectMongo from "./config/mongo.js"
import connectRedis from "./config/redis.js"

import ticketRoutes from "./1.4.3/routes.js"
import productRoutes from "./2.1.3/routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectMongo()
connectRedis()

app.use("/api/1.4.3", ticketRoutes)
app.use("/api/2.1.3", productRoutes)

app.get("/", (req, res) => {
  res.json({ status: "EXP-4 backend running" })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
