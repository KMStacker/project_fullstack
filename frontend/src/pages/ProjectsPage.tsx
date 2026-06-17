import { useState, useEffect, JSX } from 'react'
import axios from 'axios'

export interface Project {
  _id: string
  title: string
  description: string
  technologies: string
  githubUrl: string
}

const ProjectsPage = (): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    axios
      .get('/api/projects')
      .then(response => {
        setProjects(response.data)
      })
  }, [])

  return (
    <div className="content-window">
      <h1>This is the projects page!</h1>
      <h4>Here is the list of projects:</h4>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsPage