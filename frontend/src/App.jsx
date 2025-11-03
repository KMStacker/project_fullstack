'./App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import AdminPage from './pages/AdminPage'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      loginService.setToken(user.token)
    } catch (expection) {
      console.log(expection)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="nav-bar">
        <div>
          <Link className="button" to="/">Home</Link>
          <Link className="button" to="/projects">Projects</Link>
          <Link className="button" to="/skills">Skills</Link>
          {user && user.role === 'ADMIN' && (
            <Link className="button" to="/admin">Admin</Link>
          )}
        </div>
        <LoginForm user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
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