import axios from 'axios'

const baseUrl = '/api/comments'

export interface Comment {
  id: number
  content: string
  createdAt: string
  user: {
    username: string
    role: string
  } | null
  isPublic: boolean
  guestName: string | null
}

export const getAll = async (token: string | null = null): Promise<Comment[]> => {
  const config = token ? {
    headers: { Authorization: `Bearer ${token}` }
  } : {}
  const response = await axios.get<Comment[]>(baseUrl, config)
  return response.data
}

export const create = async (content: string, isPublic: boolean, guestName: string, token: string | null): Promise<Comment> => {
  const config = token ? {
    headers: { Authorization: `Bearer ${token}` }
  } : {}

  const response = await axios.post<Comment>(baseUrl, { content, isPublic, guestName }, config)
  return response.data
}

const commentService = { getAll, create }
export default commentService