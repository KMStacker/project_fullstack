import axios from 'axios'
const baseUrl = '/api/login'

export let token: string | null = null

export const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`
}

interface Credentials {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  username: string
  role: 'USER' | 'ADMIN'
}

export const login = async (credentials: Credentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(baseUrl, credentials)
  return response.data
}

const loginService = { login, setToken }
export default loginService
