import { render, screen } from '@testing-library/react'
import { expect, test, describe } from 'vitest'
import HomePage from './HomePage'

describe('HomePage', () => {
  test('renders home page welcome message', () => {
    render(<HomePage />)
    expect(screen.getByText('This is the home page!')).toBeInTheDocument()
  })
})