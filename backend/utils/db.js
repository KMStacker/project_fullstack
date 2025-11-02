const mongoose = require('mongoose')
const config = require('./config')


const connectDb = async () => {
  console.log('Connecting to db:', config.MONGODB_URI.substring(0, 14), '...', config.MONGODB_URI.substring(40))

  await mongoose.connect(config.MONGODB_URI)
  console.log('Connected to db')
}

module.exports = { connectDb }