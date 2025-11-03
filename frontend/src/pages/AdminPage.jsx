import { useState, useEffect } from 'react'
import axios from 'axios'


const AdminPage = () => {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: ''
  })
  const [editingProject, setEditingProject] = useState(null)
  const [visibleProjects, setVisibleProjects] = useState([])
  const [addingProject, setAddingProject] = useState(false)

  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: '',
    usedOn: ''
  })
  const [editingSkill, setEditingSkill] = useState(null)
  const [visibleSkills, setVisibleSkills] = useState([])
  const [addingSkill, setAddingSkill] = useState(false) 
 
  useEffect(() => {
    axios
      .get('/api/projects')
      .then(response => {
        setProjects(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('/api/skills')
      .then(response => {
        setSkills(response.data)
      })
  }, [])

  const toggleInfo = (id, visibleItems, setVisibleItems) => {
    if (visibleItems.includes(id)) {
      setVisibleItems(visibleItems.filter(itemId => itemId !== id))
    } else {
      setVisibleItems([...visibleItems, id])
    }
  }

  const handleInputChange = (event, setState, state) => {
    const { name, value } = event.target
   setState({
      ...state,
      [name]: value
    })
  }

  
  const handleAddProject = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/projects', newProject)
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

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`)
      setProjects(projects.filter(project => project._id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleEditProject = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`/api/projects/${editingProject._id}`, editingProject)
      setProjects(projects.map(project => project._id === editingProject._id ? response.data : project))
      setEditingProject(null)
    } catch (error) {
      console.error('Error editing project:', error)
    }
  }

  const handleAddSkill = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/skills', newSkill)
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

  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`/api/skills/${id}`)
      setSkills(skills.filter(skill => skill._id !== id))
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const handleEditSkill = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`/api/skills/${editingSkill._id}`, editingSkill)
      setSkills(skills.map(skill => skill._id === editingSkill._id ? response.data : skill))
      setEditingSkill(null)
    } catch (error) {
      console.error('Error editing skill:', error)
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
          <button onClick={() => setAddingProject(!addingProject)}>
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
        {projects.map(project => (
          <li key={project._id}>
            {project.title} &nbsp;
            <button className="button" onClick={() => toggleInfo(project._id, visibleProjects, setVisibleProjects)}>{visibleProjects.includes(project._id) ? 'Hide info' : 'Show info'}</button>
            <button className="button" onClick={() => { setEditingProject(editingProject && editingProject._id === project._id ? null : project) }}>{editingProject && editingProject._id === project._id ? 'Stop editing' : 'Edit'}</button>
            <button className="button" onClick={() => handleDeleteProject(project._id)}>Delete</button>
            
            {visibleProjects.includes(project._id) && (
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
            {editingProject && editingProject._id === project._id && (
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
        <button onClick={() => setAddingSkill(!addingSkill)}>
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
      {skills.map(skill => (
        <li key={skill._id}>
          {skill.name} &nbsp;
          <button className="button" onClick={() => toggleInfo(skill._id, visibleSkills, setVisibleSkills)}>{visibleSkills.includes(skill._id) ? 'Hide info' : 'Show info'}</button>
          <button className="button" onClick={() => { setEditingSkill(editingSkill && editingSkill._id === skill._id ? null : skill) }}>{editingSkill && editingSkill._id === skill._id ? 'Stop editing' : 'Edit'}</button>
          <button className="button" onClick={() => handleDeleteSkill(skill._id)}>Delete</button>
          
          {visibleSkills.includes(skill._id) && (
            <ul>
              <li>
                Level: {skill.level}
              </li>
              <li>
                UsedOn: {skill.usedOn}
              </li>
            </ul>
          )}
          {editingSkill && editingSkill._id === skill._id && (
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