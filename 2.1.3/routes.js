import express from "express"
import {
  createProduct,
  getProducts,
  updateStock,
  addReview,
  topProducts
} from "./controller.js"

const router = express.Router()

router.post("/products", createProduct)

router.get("/products", getProducts)

router.patch("/stock/:sku", updateStock)

router.post("/review/:productId", addReview)

router.get("/aggregation/top-products", topProducts)

export default router
