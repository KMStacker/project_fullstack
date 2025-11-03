const express = require('express')
const { connectDb } = require('./utils/db')
const projectsRouter = require('./controllers/projects')
const skillsRouter = require('./controllers/skills')
const tokenExtractor = require('./middleware/tokenExtractor')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const errorHandler = require('./middleware/errorHandler')

const app = express()

connectDb()

app.use(express.json())

app.use(tokenExtractor)

app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app