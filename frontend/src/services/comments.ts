import axios from 'axios'

const baseUrl = '/api/comments'

export interface Comment {
  id: number
  content: string
  createdAt: string
  user: {
    username: string
    role: string
  }
}

export const getAll = async (): Promise<Comment[]> => {
  const response = await axios.get<Comment[]>(baseUrl)
  return response.data
}

export const create = async (content: string, token: string): Promise<Comment> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post<Comment>(baseUrl, { content }, config)
  return response.data
}

const commentService = { getAll, create }
export default commentService