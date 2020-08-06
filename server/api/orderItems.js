const router = require('express').Router()
const OrderItem = require('../db/models/order-item')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
router.post('/', async (req, res, next) => {
  try {
    // req.body.productId, req.body.orderId
    const order = Order.findByPk(req.body.orderId)
    const product = Product.findByPk(req.body.productId)

    // creates a order_item instance with this information if it does NOT exist
    // UPDATES the existing instance with this new field
    //order.addProduct(product, {through: {quantity: req.body.quantity}}) // quantity: req.body.quantity
    // if we update the price use---->>>> price: req.body.price
    // findOrCreate would also work - look up return value
    const misteriousItem = await OrderItem.findOrCreate({
      where: {productId: req.body.productId, orderId: req.body.orderId}
    })
    await misteriousItem[0].update(req.body)
    res.json(misteriousItem).status(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
