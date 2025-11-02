import { useState, useEffect } from 'react'
import axios from 'axios'

const SkillsPage = () => {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    axios
      .get('/api/skills')
      .then(response => {
        setSkills(response.data)
      })
  }, [])

  return (
    <div>
      <h1>This is the skills page!</h1>
      <h4>Here is the list of skills:</h4>
      <ul>
        {skills.map(skill => (
          <li key={skill._id}>
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillsPage