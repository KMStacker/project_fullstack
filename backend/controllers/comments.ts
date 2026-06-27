import express from 'express'
import jwt from 'jsonwebtoken'
import Comment from '../models/comment'
import User from '../models/user'
import * as config from '../utils/config'
import { CustomRequest } from '../middleware/tokenExtractor'

const commentsRouter = express.Router()

commentsRouter.get('/', async (_request: express.Request, response: express.Response) => {
  const comments = await Comment.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['username', 'role']
    }
  })
  response.json(comments)
})

commentsRouter.post('/', async (request: CustomRequest, response: express.Response, next: express.NextFunction) => {
  try {
    const token = request.token
    if (!token) {
      return response.status(401).json({ error: 'token missing' })
    }

    const decodedToken = jwt.verify(token, config.SECRET || '') as jwt.JwtPayload
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }

    const { content } = request.body
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return response.status(400).json({ error: 'content is required' })
    }

    const savedComment = await Comment.create({
      content: content.trim(),
      userId: decodedToken.id
    })

    const completeComment = await Comment.findByPk(savedComment.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['username', 'role']
      }
    })

    return response.status(201).json(completeComment)
  } catch (error) {
    return next(error)
  }
})

export default commentsRouter