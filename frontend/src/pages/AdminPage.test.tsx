import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi, beforeEach, describe } from 'vitest'
import axios from 'axios'
import AdminPage from './AdminPage'

vi.mock('axios')

const mockUser = {
  username: 'admin',
  token: 'admin-token',
  role: 'ADMIN' as const
}

const mockProjects = [
  { id: 1, title: 'Project A', description: 'Desc A', technologies: 'React A', githubUrl: 'url A' }
]

const mockSkills = [
  { id: 1, name: 'Skill A', level: 'Advanced A', usedOn: 'Backend A' }
]

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(axios.get).mockImplementation((url) => {
    if (url === '/api/projects') return Promise.resolve({ data: mockProjects })
    if (url === '/api/skills') return Promise.resolve({ data: mockSkills })
    return Promise.reject(new Error('Unknown URL'))
  })
})

describe('AdminPage', () => {
  test('renders page headers and fetches resource listings successfully', async () => {
    render(<AdminPage user={mockUser} />)
    expect(screen.getByText('This is the admin page!')).toBeInTheDocument()
    expect(await screen.findByText('Project A')).toBeInTheDocument()
    expect(screen.getByText('Skill A')).toBeInTheDocument()
  })

  test('toggles the project creation form visibility when clicking buttons', async () => {
    render(<AdminPage user={mockUser} />)
    const toggleButton = screen.getByRole('button', { name: /add new project/i })
    
    await userEvent.click(toggleButton)
    expect(screen.getByText('Here you can add a new project:')).toBeInTheDocument()
    
    await userEvent.click(screen.getByRole('button', { name: /stop adding new project/i }))
    expect(screen.queryByText('Here you can add a new project:')).not.toBeInTheDocument()
  })

  test('calls axios.delete with correct headers when project delete button is clicked', async () => {
    vi.mocked(axios.delete).mockResolvedValueOnce({ data: {} })
    render(<AdminPage user={mockUser} />)
    
    const deleteButtons = await screen.findAllByRole('button', { name: /delete/i })
    const deleteButton = deleteButtons[0]
    
    await userEvent.click(deleteButton)
    
    expect(axios.delete).toHaveBeenCalledWith('/api/projects/1', {
      headers: { Authorization: 'Bearer admin-token' }
    })
  })
})