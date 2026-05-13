const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection
mongoose.connect(
'mongodb://HACKER:hackdrop123@ac-bjjow7z-shard-00-00.12vpydx.mongodb.net:27017,ac-bjjow7z-shard-00-01.12vpydx.mongodb.net:27017,ac-bjjow7z-shard-00-02.12vpydx.mongodb.net:27017/?ssl=true&replicaSet=atlas-y6aoya-shard-0&authSource=admin&appName=hackdrop-cluster'
)

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected Successfully')
})

mongoose.connection.on('error', (err) => {
  console.log('MongoDB Connection Error:', err)
})

// Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  hostel: String,
  room: String,
  product: String,
})

const Order = mongoose.model('Order', orderSchema)

// Test Route
app.get('/', (req, res) => {
  res.send('HACKDROP Backend Running')
})

// Order Route
app.post('/order', async (req, res) => {
  try {
    console.log('NEW ORDER RECEIVED')

    console.log(req.body)

    const newOrder = new Order({
      name: req.body.name,
      hostel: req.body.hostel,
      room: req.body.room,
      product: req.body.product,
    })

    await newOrder.save()

    res.json({
      success: true,
      message: 'Order received and saved successfully',
    })
  } catch (error) {
    console.log(error)

    res.json({
      success: false,
      message: 'Order failed',
    })
  }
})

// Server Start
app.listen(5000, () => {
  console.log('Server Running On Port 5000')
})