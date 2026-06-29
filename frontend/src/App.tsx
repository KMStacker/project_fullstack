import './App.css'
import { useState, useEffect, JSX } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage  from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import AdminPage from './pages/AdminPage'
import GuestbookPage from './pages/GuestbookPage'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import RegisterForm from './components/RegisterForm'
import SparkleOverlay from './components/SparkleOverlay'

interface User {
  username: string
  token: string
  role: 'USER' | 'ADMIN'
}

const App = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false)

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
      <SparkleOverlay />
      <div className="nav-bar">
        <div>
          <Link className="button" to="/">Home</Link>
          <Link className="button" to="/projects">Projects</Link>
          <Link className="button" to="/skills">Skills</Link>
          <Link className="button" to="/guestbook">Guestbook</Link>
          {user && user.role === 'ADMIN' && (
            <Link className="button" to="/admin">Admin</Link>
          )}
        </div>
        <div className="separate-boxes">
          <LoginForm user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
          {!user && (
            <button className="button" type="button" onClick={() => setShowRegisterModal(true)}>Register</button>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/admin" element={<AdminPage user={user} />} />
        <Route path="/guestbook" element={<GuestbookPage user={user} handleLogin={handleLogin} />} />
      </Routes>

      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <RegisterForm
              handleLogin={handleLogin}
              onSuccess={() => setShowRegisterModal(false)}
              onCancel={() => setShowRegisterModal(false)}
            />
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}


export default App