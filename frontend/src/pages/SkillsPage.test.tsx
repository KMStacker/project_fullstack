import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi, beforeEach, describe } from 'vitest'
import axios from 'axios'
import SkillsPage from './SkillsPage'

vi.mock('axios')

const mockSkills = [
  {
    id: 1,
    name: 'GoLang',
    level: 'Expert',
    usedOn: 'Backend API'
  }
]

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(axios.get).mockResolvedValue({ data: mockSkills })
})

describe('SkillsPage', () => {
  test('renders page title and fetches skills successfully', async () => {
    render(<SkillsPage />)
    expect(screen.getByText('This is the skills page!')).toBeInTheDocument()
    const skillName = await screen.findByText('GoLang')
    expect(skillName).toBeInTheDocument()
  })

  test('does not display skill details by default', async () => {
    render(<SkillsPage />)
    await screen.findByText('GoLang')
    expect(screen.queryByText('Level: Expert')).not.toBeInTheDocument()
  })

  test('toggles skill details when clicking the buttons', async () => {
    render(<SkillsPage />)
    await screen.findByText('GoLang')

    const showButton = screen.getByRole('button', { name: /show info/i })
    await userEvent.click(showButton)
    expect(screen.getByText('Level: Expert')).toBeInTheDocument()
    expect(screen.getByText('UsedOn: Backend API')).toBeInTheDocument()

    const hideButton = screen.getByRole('button', { name: /hide info/i })
    await userEvent.click(hideButton)
    expect(screen.queryByText('Level: Expert')).not.toBeInTheDocument()
  })
})