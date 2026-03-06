import Product from "./Product.js"

export const createProduct = async (req, res) => {

  try {

    const product = new Product(req.body)

    await product.save()

    res.json(product)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}

export const getProducts = async (req, res) => {

  try {

    const products = await Product.find()

    res.json(products)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}

export const updateStock = async (req, res) => {

  try {

    const { sku } = req.params
    const { stock } = req.body

    const product = await Product.findOneAndUpdate(
      { "variants.sku": sku },
      { $set: { "variants.$.stock": stock } },
      { new: true }
    )

    res.json(product)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}

export const addReview = async (req, res) => {

  try {

    const { productId } = req.params
    const { userId, rating, comment } = req.body

    const product = await Product.findById(productId)

    product.reviews.push({ userId, rating, comment })

    const avg =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length

    product.avgRating = avg

    await product.save()

    res.json(product)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}

export const topProducts = async (req, res) => {

  try {

    const result = await Product.aggregate([
      { $match: { avgRating: { $gte: 4 } } },
      { $sort: { avgRating: -1 } },
      { $limit: 5 }
    ])

    res.json(result)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}
