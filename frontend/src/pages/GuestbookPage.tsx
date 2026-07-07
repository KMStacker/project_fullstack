import React, { useState, useEffect, JSX } from 'react'
import commentService, { Comment } from '../services/comments'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

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
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [guestName, setGuestName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'NONE' | 'LOGIN' | 'REGISTER' | 'GUEST'>('NONE')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await commentService.getAll(user?.token || null)
        setComments(data)
      } catch (err) {
        console.error(err)
      }
    }
    void fetchComments()
  }, [user])

  const handlePostComment = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    try {
      const savedComment = await commentService.create(newComment, isPublic, guestName, user ? user.token : null)
      setComments([savedComment, ...comments])
      setNewComment('')
      setGuestName('')
      setError(null)
      setViewMode('NONE')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to post comment')
    }
  }

  const handleDeleteComment = async (id: number): Promise<void> => {
    if (!user || user.role !== 'ADMIN') return
    
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.remove(id, user.token)
        setComments(comments.filter(comment => comment.id !== id))
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete comment')
      }
    }
  }

  return (
    <div className="content-window">
      <div className="info-box">
        <h1>Guestbook</h1>
        
        <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>
          Feel free to leave a public comment, or a private message for the admin's eyes only!
        </p>
        <br/>
      </div>

      {user ? (
        <form onSubmit={handlePostComment}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="theme-input"
                value={newComment}
                onChange={({ target }) => setNewComment(target.value)}
                placeholder="Write a comment..."
                required
                style={{ width: '300px' }}
              />
              <button type="submit" className="button" style={{ margin: 0 }}>Post</button>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="checkbox"
                checked={!isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              Make comment private
            </label>
          </div>
        </form>
      ) : (
        <div style={{ marginBottom: '15px', marginTop: '2rem' }}>
          {viewMode === 'NONE' && (
            <div>
              <p>In order to leave a comment, choose one:</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="button" onClick={() => setViewMode('LOGIN')}>Login</button>
                <button className="button" onClick={() => setViewMode('REGISTER')}>Sign up</button>
                <button className="button" onClick={() => setViewMode('GUEST')}>Leave comment as guest</button>
              </div>
            </div>
          )}

          {viewMode === 'LOGIN' && (
            <LoginForm
              handleLogin={handleLogin}
              onSuccess={() => setViewMode('NONE')}
              onCancel={() => setViewMode('NONE')}
            />
          )}

          {viewMode === 'REGISTER' && (
            <RegisterForm
              handleLogin={handleLogin}
              onSuccess={() => setViewMode('NONE')}
              onCancel={() => setViewMode('NONE')}
            />
          )}

          {viewMode === 'GUEST' && (
            <form onSubmit={handlePostComment}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'gray', display: 'block', marginBottom: '5px' }}>
                    Your name will start with Guest_ followed by a unique ID (+ optional ending).
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <p>Guest_xxx + </p>
                    <input
                      type="text"
                      className="theme-input"
                      value={guestName}
                      onChange={({ target }) => setGuestName(target.value)}
                      placeholder="Optional text..."
                      style={{ width: '180px' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    className="theme-input"
                    value={newComment}
                    onChange={({ target }) => setNewComment(target.value)}
                    placeholder="Write a comment..."
                    required
                    style={{ width: '300px' }}
                  />
                  <button type="submit" className="button" style={{ margin: 0 }}>Post</button>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={!isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                  />
                  Make comment private
                </label>
                <button type="button" className="button" onClick={() => setViewMode('NONE')} style={{ width: '100px' }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Comments:</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {comments.map(comment => (
          <li key={comment.id} style={{ marginBottom: '10px' }}>
            <strong>{comment.user ? comment.user.username : `${comment.guestName}`}</strong>
            {!comment.isPublic && <span style={{ fontStyle: 'italic', fontSize: '0.8rem', marginLeft: '5px' }}>[Private]</span>}
            : {comment.content}
            {user?.role === 'ADMIN' && (
              <button 
                className="button" 
                onClick={() => void handleDeleteComment(comment.id)} 
                style={{ padding: '2px 8px', fontSize: '0.8rem', marginLeft: '10px' }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GuestbookPage