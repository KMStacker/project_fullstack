import { useState, useEffect, JSX } from 'react'
import axios from 'axios'

export interface Project {
  id: number
  title: string
  description: string
  technologies: string
  githubUrl: string
}

export interface Skill {
  id: number
  name: string
  level: string
  usedOn: string
  description?: string
  technologies?: string
}

interface User {
  username: string
  token: string
  role: 'USER' | 'ADMIN'
}

interface AdminPageProps {
  user: User | null
}

const AdminPage = ({ user }: AdminPageProps): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: ''
  })
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [addingProject, setAddingProject] = useState<boolean>(false)

  const [skills, setSkills] = useState<Skill[]>([])
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: '',
    usedOn: ''
  })
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [visibleSkills, setVisibleSkills] = useState<number[]>([])
  const [addingSkill, setAddingSkill] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get<Project[]>('/api/projects')
      .then(response => {
        setProjects(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get<Skill[]>('/api/skills')
      .then(response => {
        setSkills(response.data)
      })
  }, [])

  const toggleInfo = (id: number, visibleItems: number[], setVisibleItems: React.Dispatch<React.SetStateAction<number[]>>): void => {
    if (visibleItems.includes(id)) {
      setVisibleItems(visibleItems.filter(itemId => itemId !== id))
    } else {
      setVisibleItems([...visibleItems, id])
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>, state: any): void => {
    const { name, value } = event.target
   setState({
      ...state,
      [name]: value
    })
  }

  
  const handleAddProject = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      }
      const response = await axios.post('/api/projects', newProject, config)
      setProjects([...projects, response.data])
      setNewProject({
        title: '',
        description: '',
        technologies: '',
        githubUrl: ''
      })
      setAddingProject(false)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const handleDeleteProject = async (id: number): Promise<void> => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      }
      await axios.delete(`/api/projects/${id}`, config)
      setProjects(projects.filter(project => project.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleEditProject = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    if (!editingProject) return
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      }
      const response = await axios.put(`/api/projects/${editingProject.id}`, editingProject, config)
      setProjects(projects.map(project => project.id === editingProject.id ? response.data : project))
      setEditingProject(null)
    } catch (error) {
      console.error('Error editing project:', error)
    }
  }

  const handleAddSkill = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      }
      const response = await axios.post('/api/skills', newSkill, config)
      setSkills([...skills, response.data])
      setNewSkill({
        name: '',
        level: '',
        usedOn: ''
      })
      setAddingSkill(false)
    } catch (error) {
      console.error('Error creating skill:', error)
    }
  }

  const handleDeleteSkill = async (id: number): Promise<void> => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      }
      await axios.delete(`/api/skills/${id}`, config)
      setSkills(skills.filter(skill => skill.id !== id))
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const handleEditSkill = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    if (!editingSkill) return
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      }
      const response = await axios.put(`/api/skills/${editingSkill.id}`, editingSkill, config)
      setSkills(skills.map(skill => skill.id === editingSkill.id ? response.data : skill))
      setEditingSkill(null)
    } catch (error) {
      console.error('Error editing skill:', error)
    }
  }

  const handleReorderProjects = async (index: number, direction: 'UP' | 'DOWN'): Promise<void> => {
    const newProjects = [...projects]
    if (direction === 'UP' && index > 0) {
      [newProjects[index], newProjects[index - 1]] = [newProjects[index - 1], newProjects[index]]
    } else if (direction === 'DOWN' && index < newProjects.length - 1) {
      [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]]
    } else {
      return
    }
    
    setProjects(newProjects)
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } }
      await axios.put('/api/projects/reorder', { orderedIds: newProjects.map(p => p.id) }, config)
    } catch (error) {
      console.error('Error reordering projects:', error)
    }
  }

  const handleReorderSkills = async (index: number, direction: 'UP' | 'DOWN'): Promise<void> => {
    const newSkills = [...skills]
    if (direction === 'UP' && index > 0) {
      [newSkills[index], newSkills[index - 1]] = [newSkills[index - 1], newSkills[index]]
    } else if (direction === 'DOWN' && index < newSkills.length - 1) {
      [newSkills[index], newSkills[index + 1]] = [newSkills[index + 1], newSkills[index]]
    } else {
      return
    }
    
    setSkills(newSkills)
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } }
      await axios.put('/api/skills/reorder', { orderedIds: newSkills.map(s => s.id) }, config)
    } catch (error) {
      console.error('Error reordering skills:', error)
    }
  }

  return (
    <>
    <div className="content-window">
      <h1>This is the admin page!</h1>
    </div>
    <hr></hr>
    <div>
      <div className="content-window">
        <div>
          <button className="button" onClick={() => setAddingProject(!addingProject)}>
            {addingProject ? 'Stop adding new project' : 'Add new project'}
          </button>
        </div>
        

        {addingProject && (
          <div>
            <h4>Here you can add a new project:</h4>
            <form onSubmit={handleAddProject}>
              <div className="form-grid">
                Title: <input type="text" name="title" value={newProject.title} onChange={(event) => handleInputChange(event, setNewProject, newProject)} />
                Description: <input type="text" name="description" value={newProject.description} onChange={(event) => handleInputChange(event, setNewProject, newProject)} />
                Technologies: &nbsp; <input type="text" name="technologies" value={newProject.technologies} onChange={(event) => handleInputChange(event, setNewProject, newProject)} />
                GitHub: <input type="text" name="githubUrl" value={newProject.githubUrl} onChange={(event) => handleInputChange(event, setNewProject, newProject)} />
                <button style={{ marginTop: '10px'}} type="submit">Add project</button>
              </div>
            </form>
          </div>
        )}

        <h4 style={{ marginBottom: '5px'}}>Projects:</h4>
        {projects.map((project, index) => (
          <li key={project.id}>
            {project.title} &nbsp;
            <button className="button" onClick={() => void handleReorderProjects(index, 'UP')} disabled={index === 0}>↑</button>
            <button className="button" onClick={() => void handleReorderProjects(index, 'DOWN')} disabled={index === projects.length - 1}>↓</button>
            <button className="button" onClick={() => toggleInfo(project.id, visibleProjects, setVisibleProjects)}>{visibleProjects.includes(project.id) ? 'Hide info' : 'Show info'}</button>
            <button className="button" onClick={() => { setEditingProject(editingProject && editingProject.id === project.id ? null : project) }}>{editingProject && editingProject.id === project.id ? 'Stop editing' : 'Edit'}</button>
            <button className="button" onClick={() => void handleDeleteProject(project.id)}>Delete</button>
            
            {visibleProjects.includes(project.id) && (
              <ul>
                <li>
                  Description: {project.description}
                </li>
                <li>
                  Technologies: {project.technologies}
                </li>
                <li>
                  GitHub: {project.githubUrl}
                </li>
              </ul>
            )}
            {editingProject && editingProject.id === project.id && (
              <div>
                <h4>Here you can edit the project you have chosen: "{editingProject.title}"</h4>
                <form onSubmit={handleEditProject}>
                  <div className="form-grid">
                    Title: <input type="text" name="title" value={editingProject.title} onChange={(event) => handleInputChange(event, setEditingProject, editingProject)} />
                    Description: <input type="text" name="description" value={editingProject.description} onChange={(event) => handleInputChange(event, setEditingProject, editingProject)} />
                    Technologies: <input type="text" name="technologies" value={editingProject.technologies} onChange={(event) => handleInputChange(event, setEditingProject, editingProject)} />
                    GitHub: <input type="text" name="githubUrl" value={editingProject.githubUrl} onChange={(event) => handleInputChange(event, setEditingProject, editingProject)} />
                    <button style={{ marginTop: '10px'}} type="submit">Save editions</button>
                  </div>
                </form>
              </div>
            )}
          </li>
        ))}
      </div>

      <hr></hr>
      
      
    <div className="content-window">
      <div>
        <button className="button" onClick={() => setAddingSkill(!addingSkill)}>
          {addingSkill ? 'Stop adding new skill' : 'Add new skill'}
        </button>
      </div>
      {addingSkill && (
        <div>
          <h4>Here you can add a new skill:</h4>
          <form onSubmit={handleAddSkill}>
            <div className="form-grid">
              Name: <input type="text" name="name" value={newSkill.name} onChange={(event) => handleInputChange(event, setNewSkill, newSkill)} />
              Level: <input type="text" name="level" value={newSkill.level} onChange={(event) => handleInputChange(event, setNewSkill, newSkill)} />
              UsedOn: <input type="text" name="usedOn" value={newSkill.usedOn} onChange={(event) => handleInputChange(event, setNewSkill, newSkill)} />
              <button style={{ marginTop: '10px'}} type="submit">Add skill</button>
            </div>
          </form>
        </div>
      )}

      <h4 style={{ marginBottom: '5px'}}>Skills:</h4>
      {skills.map((skill, index) => (
        <li key={skill.id}>
          {skill.name} &nbsp;
          <button className="button" onClick={() => void handleReorderSkills(index, 'UP')} disabled={index === 0}>↑</button>
          <button className="button" onClick={() => void handleReorderSkills(index, 'DOWN')} disabled={index === skills.length - 1}>↓</button>
          <button className="button" onClick={() => toggleInfo(skill.id, visibleSkills, setVisibleSkills)}>{visibleSkills.includes(skill.id) ? 'Hide info' : 'Show info'}</button>
          <button className="button" onClick={() => { setEditingSkill(editingSkill && editingSkill.id === skill.id ? null : skill) }}>{editingSkill && editingSkill.id === skill.id ? 'Stop editing' : 'Edit'}</button>
          <button className="button" onClick={() => void handleDeleteSkill(skill.id)}>Delete</button>
          
          {visibleSkills.includes(skill.id) && (
            <ul>
              <li>
                Level: {skill.level}
              </li>
              <li>
                UsedOn: {skill.usedOn}
              </li>
            </ul>
          )}
          {editingSkill && editingSkill.id === skill.id && (
            <div>
              <h4>Here you can edit the skill you have chosen: "{editingSkill.name}"</h4>
              <form onSubmit={handleEditSkill}>
                <div className="form-grid">
                  Name: <input type="text" name="name" value={editingSkill.name} onChange={(event) => handleInputChange(event, setEditingSkill, editingSkill)} />
                  Level: <input type="text" name="description" value={editingSkill.level} onChange={(event) => handleInputChange(event, setEditingSkill, editingSkill)} />
                  UsedOn: <input type="text" name="technologies" value={editingSkill.usedOn} onChange={(event) => handleInputChange(event, setEditingSkill, editingSkill)} />
                  <button style={{ marginTop: '10px'}} type="submit">Save editions</button>
                </div>
              </form>
            </div>
          )}
        </li>
      ))}
    </div>
    </div>
    </>
  )
}

export default AdminPage