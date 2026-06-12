import express from 'express'
import { connectDb } from './utils/db'
import projectsRouter from './controllers/projects'
import skillsRouter from './controllers/skills'
import tokenExtractor from './middleware/tokenExtractor'
import unknownEndpoint from './middleware/unknownEndpoint'
import errorHandler from './middleware/errorHandler'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import requestLogger from './middleware/requestLogger'

const app = express()

connectDb()

app.use(express.json())

app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app