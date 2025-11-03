import { useState } from 'react'

const LoginForm = ({ user, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = async (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  if (user) {
    return (
      <div className="login-form">
        <p>
          Welcome, {user.username}! &nbsp;
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submitLogin} className="login-form">
      <div>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm