import React, { useState, useEffect, JSX } from 'react'
import commentService, { Comment } from '../services/comments'
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
  const [error, setError] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

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

  return (
    <div className="content-window">
      <h1>Guestbook</h1>

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
            <div style={{ marginBottom: '15px' }}>
              <RegisterForm
                handleLogin={handleLogin}
                onSuccess={() => setIsRegistering(false)}
                onCancel={() => setIsRegistering(false)}
              />
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