import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.post('/', async (request: express.Request, response: express.Response) => {
  const { username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

export default usersRouter