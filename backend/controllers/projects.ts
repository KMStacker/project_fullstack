import express from 'express'
import Project from '../models/project'
import { adminAuthorization } from '../middleware/adminAuthorization'

const projectsRouter = express.Router()

// get all projects
projectsRouter.get('/', async (_request: express.Request, response: express.Response) => {
  const projects = await Project.findAll()
  response.json(projects)
})

// create new project
projectsRouter.post('/', adminAuthorization, async (request: express.Request, response: express.Response) => {
  const body = request.body
  const savedProject = await Project.create({
    title: body.title,
    description: body.description || '',
    technologies: body.technologies || '',
    githubUrl: body.githubUrl || '',
  })
  response.status(201).json(savedProject)
})

// update project
projectsRouter.put('/:id', adminAuthorization, async (request: express.Request, response: express.Response) => {
  const projectId = Number(request.params.id)
  const project = await Project.findByPk(projectId)
  if (project) {
    const body = request.body
    project.title = body.title
    project.description = body.description || ''
    project.technologies = body.technologies || ''
    project.githubUrl = body.githubUrl || ''
    await project.save()
    response.json(project)
  } else {
    response.status(404).end()
  }
})


// delete project
projectsRouter.delete('/:id', adminAuthorization, async (request: express.Request, response: express.Response) => {
  const projectId = Number(request.params.id)
  const project = await Project.findByPk(projectId)
  if (project) {
    await project.destroy()
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

export default projectsRouter
