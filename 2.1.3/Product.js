import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: String
}, { _id: false })

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  color: String,
  price: Number,
  stock: Number
}, { _id: false })

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    index: true
  },
  variants: [variantSchema],
  reviews: [reviewSchema],
  avgRating: {
    type: Number,
    default: 0
  }
})

productSchema.index({ name: 1, category: 1 })

export default mongoose.model("Product", productSchema)
