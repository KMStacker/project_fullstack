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
    <div className="content-window" style={{ width: '100%', maxWidth: '650px', display: 'block', margin: '20px auto', padding: '30px' }}>
      <style>{`
        @keyframes cardColorShift {
          0% {
            background-position: 85%;
            border-color: #fcf6ba;
            box-shadow: 0 0 15px rgba(252, 246, 186, 0.4);
          }
          50% {
            border-color: #3a506b;
          }
          100% {
            background-position: 15%;
            border-color: rgba(252, 246, 186, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          }
        }
        .animated-slide-card {
          background: linear-gradient(120deg, rgba(20, 19, 94, 0.9) 0%, rgba(49, 71, 113, 0.9) 30%, rgba(20, 19, 94, 0.9) 50%, rgba(49, 71, 113, 0.9) 70%, rgba(20, 19, 94, 0.9) 100%);
          background-size: 300% auto;
          animation: cardColorShift 0.6s ease-out forwards;
        }
      `}</style>

      <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#fcf6ba' }}>Projects Showcase</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', minHeight: '250px' }}>
        <button className="button" onClick={handlePrevious} style={{ padding: '12px 16px', fontSize: '1.2rem' }}>
          &larr;
        </button>
        
        <div key={currentIndex} className="animated-slide-card" style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', padding: '20px', borderRadius: '8px', border: '1px solid transparent' }}>
          <div>
            <h3 style={{ color: '#fcf6ba', fontSize: '1.6rem', marginTop: 0, marginBottom: '15px' }}>{currentProject.title}</h3>
            <p style={{ color: '#f1f5f9', lineHeight: '1.6', marginBottom: '2rem' }}>{currentProject.description}</p>
            <p style={{ fontSize: '0.95rem', color: '#f1f5f9', marginTop: '3rem', marginBottom: '5px' }}>
              <strong style={{ color: '#bf953f' }}>Technologies:</strong> {currentProject.technologies}
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