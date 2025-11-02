const express = require('express')
const { connectDb } = require('./utils/db')
const app = express()

connectDb()

app.use(express.json())

module.exports = app