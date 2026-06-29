import { useState, useEffect, JSX } from 'react'
import axios from 'axios'

export interface Project {
  id: number
  title: string
  description: string
  technologies: string
  githubUrl: string
}

const ProjectsPage = (): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([])
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])

  useEffect(() => {
    axios
      .get('/api/projects')
      .then(response => {
        setProjects(response.data)
      })
  }, [])

  const toggleInfo = (id: number): void => {
    if (visibleProjects.includes(id)) {
      setVisibleProjects(visibleProjects.filter(itemId => itemId !== id))
    } else {
      setVisibleProjects([...visibleProjects, id])
    }
  }

  return (
    <div className="content-window">
      <h1>This is the projects page!</h1>
      <h4>Here is the list of projects:</h4>
      <ul>
        {projects.map(project => (
          <li key={project.id} style={{ marginBottom: '10px' }}>
            {project.title} &nbsp;
            <button className="button" onClick={() => toggleInfo(project.id)}>
              {visibleProjects.includes(project.id) ? 'Hide info' : 'Show info'}
            </button>
            {visibleProjects.includes(project.id) && (
              <ul>
                <li>Description: {project.description}</li>
                <li>Technologies: {project.technologies}</li>
                <li>GitHub: {project.githubUrl}</li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsPage