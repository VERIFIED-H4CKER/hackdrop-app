const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://HACKER:hackdrop123@hackdrop-cluster.12vpydx.mongodb.net/hackdropDB?retryWrites=true&w=majority'
)

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected Successfully')
})

mongoose.connection.on('error', (err) => {
  console.log('MongoDB Error:', err)
})

// Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  hostel: String,
  room: String,
  product: String,
})

const Order = mongoose.model('Order', orderSchema)

// POST Order API
app.post('/order', async (req, res) => {
  try {

    const { name, hostel, room, product } = req.body

    const newOrder = new Order({
      name,
      hostel,
      room,
      product,
    })

    await newOrder.save()

    res.json({
      success: true,
      message: 'Order Placed Successfully',
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
})

// GET Orders API
app.get('/orders', async (req, res) => {

  try {

    const orders = await Order.find()

    res.json(orders)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'Error fetching orders',
    })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`)
})