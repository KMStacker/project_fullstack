import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.post('/', async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const { username, password } = request.body

    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }

    if (!password || typeof password !== 'string' || password.length < 5) {
      return response.status(400).json({ error: 'password must be at least 5 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const savedUser = await User.create({
      username: username.trim(),
      passwordHash
    })

    return response.status(201).json({
      id: savedUser.id,
      username: savedUser.username,
      role: savedUser.role
    })
  } catch (error) {
    return next(error)
  }
})

export default usersRouter