'./App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import AdminPage from './pages/AdminPage'

const App = () => {

  return (
    <BrowserRouter>
      <div className="nav-bar">
        <div>
          <Link className="button" to="/">Home</Link>
          <Link className="button" to="/projects">Projects</Link>
          <Link className="button" to="/skills">Skills</Link>
          <Link className="button" to="/admin">Admin</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App