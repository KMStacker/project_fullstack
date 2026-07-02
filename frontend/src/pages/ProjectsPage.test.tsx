import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi, beforeEach, describe } from 'vitest'
import axios from 'axios'
import ProjectsPage from './ProjectsPage'

vi.mock('axios')

const mockProjects = [
  {
    id: 1,
    title: 'E2E App',
    description: 'Test description',
    technologies: 'Node, React',
    githubUrl: 'https://github.com/test'
  }
]

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(axios.get).mockResolvedValue({ data: mockProjects })
})

describe('ProjectsPage', () => {
  test('renders page title and fetches projects successfully', async () => {
    render(<ProjectsPage />)
    expect(screen.getByText('This is the projects page!')).toBeInTheDocument()
    const projectTitle = await screen.findByText('E2E App')
    expect(projectTitle).toBeInTheDocument()
  })

  test('does not display project details by default', async () => {
    render(<ProjectsPage />)
    await screen.findByText('E2E App')
    expect(screen.queryByText('Description: Test description')).not.toBeInTheDocument()
  })

  test('toggles project details when clicking the buttons', async () => {
    render(<ProjectsPage />)
    await screen.findByText('E2E App')

    const showButton = screen.getByRole('button', { name: /show info/i })
    await userEvent.click(showButton)
    expect(screen.getByText('Description: Test description')).toBeInTheDocument()
    expect(screen.getByText('Technologies: Node, React')).toBeInTheDocument()

    const hideButton = screen.getByRole('button', { name: /hide info/i })
    await userEvent.click(hideButton)
    expect(screen.queryByText('Description: Test description')).not.toBeInTheDocument()
  })
})