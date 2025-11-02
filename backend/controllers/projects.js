const projectsRouter = require('express').Router()
const Project = require('../models/project')

// get all projects
projectsRouter.get('/', async (request, response) => {
  const projects = await Project
    .find({})
  response.json(projects)
})

// create new project
projectsRouter.post('/', async (request, response) => {
  const body = request.body

  const project = new Project({
    title: body.title,
    description: body.description || '',
    technologies: body.technologies || '',
    githubUrl: body.githubUrl || '',
  })

  const savedProject = await project.save()
  response.status(201).json(savedProject)
})

// update project
projectsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const project = {
    title: body.title,
    description: body.description || '',
    technologies: body.technologies || '',
    githubUrl: body.githubUrl || '',
  }

  const updatedProject = await Project
    .findByIdAndUpdate(request.params.id, project, { new: true })
  response.json(updatedProject)
})


// delete project
projectsRouter.delete('/:id', async (request, response) => {
  await Project
    .findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = projectsRouter
