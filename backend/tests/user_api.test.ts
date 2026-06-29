import { beforeEach, describe, test, expect, afterAll, beforeAll } from '@jest/globals'
import supertest from 'supertest'
import app from '../app'
import User from '../models/user'
import { sequelize, connectDb } from '../utils/db'

const api = supertest(app)

beforeAll(async () => {
  await connectDb()
})

beforeEach(async () => {
  await User.destroy({ where: {} })
})

describe('user registration endpoint', () => {
  test('successfully creates a new user with valid data', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    expect(response.body.username).toBe('testuser')
    expect(response.body.role).toBe('USER')

    const usersInDb = await User.findAll()
    expect(usersInDb).toHaveLength(1)
    expect(usersInDb[0].username).toBe('testuser')
  })

  test('returns 400 when username is too short', async () => {
    const invalidUser = {
      username: 'us',
      password: 'testpassword'
    }

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    expect(response.body.error).toContain('username must be at least 3 characters long')
  })
})

afterAll(async () => {
  await sequelize.close()
})