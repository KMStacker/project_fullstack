import './App.css'
import { useState, useEffect, JSX } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import AdminPage from './pages/AdminPage'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

interface User {
  username: string
  token: string
  role: 'USER' | 'ADMIN'
}

const App = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON) as User
      setUser(userObj)
      loginService.setToken(userObj.token)
    }
  }, [])

  const handleLogin = async (username: string, password: string): Promise<void> => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      loginService.setToken(loggedUser.token)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = (): void => {
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