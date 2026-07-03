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
    usedOn: 'Backend'
  },
  {
    id: 2,
    name: 'React',
    level: 'Intermediate',
    usedOn: 'Frontend'
  }
]

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(axios.get).mockResolvedValue({ data: mockSkills })
})

describe('SkillsPage', () => {
  test('renders page title and fetches skills successfully', async () => {
    render(<SkillsPage />)
    expect(screen.getByText('Skills Showcase')).toBeInTheDocument()
    const skillName = await screen.findByText('GoLang')
    expect(skillName).toBeInTheDocument()
  })

  test('displays first skill details by default', async () => {
    render(<SkillsPage />)
    await screen.findByText('GoLang')
    expect(screen.getByText('Expert')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
  })

  test('navigates between skills when clicking the next and previous buttons', async () => {
    render(<SkillsPage />)
    await screen.findByText('GoLang')

    const nextButton = screen.getByRole('button', { name: '→' })
    await userEvent.click(nextButton)

    expect(await screen.findByText('React')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()

    const prevButton = screen.getByRole('button', { name: '←' })
    await userEvent.click(prevButton)

    expect(await screen.findByText('GoLang')).toBeInTheDocument()
  })
})