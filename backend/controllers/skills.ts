import express from 'express'
import Skill from '../models/skill'


const skillsRouter = express.Router()

// get all skills
skillsRouter.get('/', async (_request: express.Request, response: express.Response) => {
  const skills = await Skill
    .find({})
  response.json(skills)
})

// create new skill
skillsRouter.post('/', async (request: express.Request, response: express.Response) => {
  const body = request.body

  const skill = new Skill({
    name: body.name,
    level: body.level,
    usedOn: body.usedOn,
  })

  const savedSkill = await skill.save()
  response.status(201).json(savedSkill)
})

// update skill
skillsRouter.put('/:id', async (request: express.Request, response: express.Response) => {
  const body = request.body

  const skill = {
    name: body.name,
    level: body.level,
    usedOn: body.usedOn,
  }

  const updatedSkill = await Skill
    .findByIdAndUpdate(request.params.id, skill, { new: true })
  response.json(updatedSkill)
})

// delete skill
skillsRouter.delete('/:id', async (request: express.Request, response: express.Response) => {
  await Skill
    .findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default skillsRouter