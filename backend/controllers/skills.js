const skillsRouter = require('express').Router()
const Skill = require('../models/skill')


// get all skills
skillsRouter.get('/', async (request, response) => {
  const skills = await Skill
    .find({})
  response.json(skills)
})

// create new skill
skillsRouter.post('/', async (request, response) => {
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
skillsRouter.put('/:id', async (request, response) => {
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
skillsRouter.delete('/:id', async (request, response) => {
  await Skill
    .findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = skillsRouter