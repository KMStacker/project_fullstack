import { beforeEach, describe, test, expect, afterAll, beforeAll } from '@jest/globals'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../app'
import Skill from '../models/skill'
import User from '../models/user'
import { sequelize, connectDb } from '../utils/db'
import * as config from '../utils/config'

const api = supertest(app)

let adminToken: string
let userToken: string

beforeAll(async () => {
  await connectDb()
})

beforeEach(async () => {
  await Skill.destroy({ where: {} })
  await User.destroy({ where: {} })

  const adminUser = await User.create({
    username: 'admin',
    passwordHash: '12345',
    role: 'ADMIN'
  })

  const normalUser = await User.create({
    username: 'user',
    passwordHash: '12345',
    role: 'USER'
  })

  adminToken = jwt.sign(
    { username: adminUser.username, id: adminUser.id, role: adminUser.role },
    config.SECRET || ''
  )

  userToken = jwt.sign(
    { username: normalUser.username, id: normalUser.id, role: normalUser.role },
    config.SECRET || ''
  )
})

describe('skills api validation', () => {
  test('all skills can be fetched', async () => {
    await Skill.create({
      name: 'Python',
      level: 'Good',
      usedOn: 'Scripts'
    })

    const response = await api
      .get('/api/skills')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(1)
    expect(response.body[0].name).toBe('Python')
  })

  test('skill creation succeeds with valid admin token', async () => {
    const newSkill = {
      name: 'TypeScript',
      level: 'Rookie',
      usedOn: 'Fullstack'
    }

    const response = await api
      .post('/api/skills')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newSkill)
      .expect(201)

    expect(response.body.name).toBe('TypeScript')

    const skillsAtEnd = await Skill.findAll()
    expect(skillsAtEnd).toHaveLength(1)
  })

  test('skill creation fails with standard user token', async () => {
    const newSkill = {
      name: 'User skill',
      level: 'okay',
      usedOn: 'everywhere'
    }

    await api
      .post('/api/skills')
      .set('Authorization', `Bearer ${userToken}`)
      .send(newSkill)
      .expect(403)

    const skillsAtEnd = await Skill.findAll()
    expect(skillsAtEnd).toHaveLength(0)
  })

  test('skill creation fails without token', async () => {
    const newSkill = {
      name: 'Zero Token Skill',
      level: 'Quite good',
      usedOn: 'idk where'
    }

    await api
      .post('/api/skills')
      .send(newSkill)
      .expect(401)
  })
})

afterAll(async () => {
  await sequelize.close()
})