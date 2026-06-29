import { useState, useEffect, JSX } from 'react'
import axios from 'axios'

export interface Skill {
  id: number
  name: string
  level: string
  usedOn: string
}

const SkillsPage = (): JSX.Element => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [visibleSkills, setVisibleSkills] = useState<number[]>([])

  useEffect(() => {
    axios
      .get('/api/skills')
      .then(response => {
        setSkills(response.data)
      })
  }, [])

  const toggleInfo = (id: number): void => {
    if (visibleSkills.includes(id)) {
      setVisibleSkills(visibleSkills.filter(itemId => itemId !== id))
    } else {
      setVisibleSkills([...visibleSkills, id])
    }
  }

  return (
    <div className="content-window">
      <h1>This is the skills page!</h1>
      <h4>Here is the list of skills:</h4>
      <ul>
        {skills.map(skill => (
          <li key={skill.id} style={{ marginBottom: '10px' }}>
            {skill.name} &nbsp;
            <button className="button" onClick={() => toggleInfo(skill.id)}>
              {visibleSkills.includes(skill.id) ? 'Hide info' : 'Show info'}
            </button>
            {visibleSkills.includes(skill.id) && (
              <ul>
                <li>Level: {skill.level}</li>
                <li>UsedOn: {skill.usedOn}</li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkillsPage