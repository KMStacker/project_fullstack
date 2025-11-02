
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App