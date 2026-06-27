import React, { useState, useEffect, JSX } from 'react'
import axios from 'axios'
import commentService, { Comment } from '../services/comments'

interface User {
  username: string
  token: string
  role: 'USER' | 'ADMIN'
}

interface GuestbookPageProps {
  user: User | null
  handleLogin: (username: string, password: string) => Promise<void>
}

const GuestbookPage = ({ user, handleLogin }: GuestbookPageProps): JSX.Element => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [regUsername, setRegUsername] = useState<string>('')
  const [regPassword, setRegPassword] = useState<string>('')
  const [regPasswordAgain, setRegPasswordAgain] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [showOptional, setShowOptional] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await commentService.getAll()
        setComments(data)
      } catch (err) {
        console.error(err)
      }
    }
    void fetchComments()
  }, [])

  const handlePostComment = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    if (!user) {
      setError('You must be logged in to comment')
      return
    }
    try {
      const savedComment = await commentService.create(newComment, user.token)
      setComments([...comments, savedComment])
      setNewComment('')
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to post comment')
    }
  }

  const handleRegister = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    if (regPassword !== regPasswordAgain) {
      setError('Passwords do not match')
      return
    }
    try {
      await axios.post('/api/users', {
        username: regUsername,
        password: regPassword
      })
      setShowModal(true)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  const handleModalChoice = async (autoLogin: boolean): Promise<void> => {
    setShowModal(false)
    if (autoLogin) {
      await handleLogin(regUsername, regPassword)
    }
    setIsRegistering(false)
    setRegUsername('')
    setRegPassword('')
    setRegPasswordAgain('')
    setEmail('')
    setPhone('')
  }

  return (
    <div className="content-window">
      <h1>Guestbook</h1>

      {showModal && (
        <div style={{ padding: '10px', background: '#fff', border: '1px solid #ccc', marginBottom: '15px', borderRadius: '5px' }}>
          <p>Registration successful! Do you want to log in also?</p>
          <button className="button" onClick={() => void handleModalChoice(true)}>Yes</button>
          <button className="button" onClick={() => void handleModalChoice(false)}>No</button>
        </div>
      )}

      {user ? (
        <form onSubmit={handlePostComment}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
              placeholder="Write a comment..."
              style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '300px' }}
            />
            <button type="submit" className="button" style={{ margin: 0 }}>Post</button>
          </div>
        </form>
      ) : (
        <div>
          {!isRegistering ? (
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontStyle: 'italic' }}>Please log in to leave a comment.</p>
              <button className="button" onClick={() => setIsRegistering(true)}>Register in to leave a comment</button>
            </div>
          ) : (
            <div style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <h3>Register New Account</h3>
              <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '5px' }}>
                  <input type="text" value={regUsername} onChange={({ target }) => setRegUsername(target.value)} placeholder="Username" required />
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <input type="password" value={regPassword} onChange={({ target }) => setRegPassword(target.value)} placeholder="Password" required />
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <input type="password" value={regPasswordAgain} onChange={({ target }) => setRegPasswordAgain(target.value)} placeholder="Password again" required />
                </div>
                
                <div style={{ marginBottom: '5px' }}>
                  <button type="button" onClick={() => setShowOptional(!showOptional)} style={{ cursor: 'pointer' }}>
                    {showOptional ? 'Hide optional information' : 'Show optional information'}
                  </button>
                  {showOptional && (
                    <div style={{ marginTop: '5px', paddingLeft: '10px' }}>
                      <div style={{ marginBottom: '5px' }}>
                        <input type="email" value={email} onChange={({ target }) => setEmail(target.value)} placeholder="Email (optional)" />
                      </div>
                      <div>
                        <input type="text" value={phone} onChange={({ target }) => setPhone(target.value)} placeholder="Phone number (optional)" />
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" className="button">Register</button>
                <button type="button" className="button" onClick={() => setIsRegistering(false)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Comments:</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {comments.map(comment => (
          <li key={comment.id} style={{ marginBottom: '10px' }}>
            <strong>{comment.user.username}</strong>: {comment.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GuestbookPage