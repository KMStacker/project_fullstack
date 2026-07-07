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
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('/api/projects')
        setProjects(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    void fetchProjects()
  }, [])

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const handlePrevious = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  if (projects.length === 0) {
    return (
      <div className="content-window">
        <h1>This is the projects page!</h1>
        <p>No projects found.</p>
      </div>
    )
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="content-window showcase-container">
      <h1 className="showcase-header">Projects Showcase</h1>
      
      <div className="showcase-nav-wrapper">
        <button className="button" onClick={handlePrevious} style={{ padding: '12px 16px', fontSize: '1.2rem' }}>
          &larr;
        </button>
        
        <div key={currentProject.id} className="animated-slide-card showcase-card">
          <div>
            <h3 className="showcase-title">{currentProject.title}</h3>
            <p className="showcase-description">{currentProject.description}</p>
            <p className="showcase-tech">
              <strong className="showcase-tech-label">Technologies:</strong> {currentProject.technologies}
            </p>
          </div>
          
          <div>
            {currentProject.githubUrl && (
              <a 
                href={currentProject.githubUrl} 
                className="button" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: '10px', marginBottom: '5px' }}
              >
                View in GitHub
              </a>
            )}
          </div>
        </div>
        
        <button className="button" onClick={handleNext} style={{ padding: '12px 16px', fontSize: '1.2rem' }}>
          &rarr;
        </button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: currentIndex === index ? '#fcf6ba' : 'rgba(255, 255, 255, 0.25)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
              cursor: 'pointer',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage