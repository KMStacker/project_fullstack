import { useState, useEffect, JSX } from 'react'
import axios from 'axios'

export interface Skill {
  _id:string
  name: string
  level: string
  usedOn: string
}

const SkillsPage = (): JSX.Element => {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    axios
      .get('/api/skills')
      .then(response => {
        setSkills(response.data)
      })
  }, [])

  return (
    <div className="content-window">
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