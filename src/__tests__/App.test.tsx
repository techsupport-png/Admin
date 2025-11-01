import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'

describe('App', () => {
  it('renders login when no user is present', () => {
    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    )

    // We expect the login page to prompt for sign in
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument()
  })
})
