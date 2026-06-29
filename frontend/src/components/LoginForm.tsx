import React, { useState, JSX } from 'react'

interface User {
  username: string
  token: string
  role: 'USER' | 'ADMIN'
}

interface LoginFormProps {
  user: User | null
  handleLogin: (usernae: string, password: string) => Promise<void> | void
  handleLogout: () => void
}

const LoginForm = ({ user, handleLogin, handleLogout }: LoginFormProps): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const submitLogin = async (event: React.SyntheticEvent<HTMLFormElement>): Promise<void> => {
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
          <button className="button" onClick={handleLogout}>Logout</button>
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
      <button type="submit" className="button">Login</button>
    </form>
  )
}

export default LoginForm