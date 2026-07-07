import { render, screen } from '@testing-library/react'
import { expect, test, describe, vi } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  test('renders home page welcome message', () => {
    render(<HomePage user={null} theme="default" setTheme={vi.fn()} />)
    expect(screen.getByText('Welcome to My CV!')).toBeInTheDocument()
    expect(screen.getByText(/Golden/i)).toBeInTheDocument()
  })
})