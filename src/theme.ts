import { createTheme } from '@mui/material/styles'

// Minimal MUI theme used by tests and optional ThemeProvider in the app
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6b35', // Bridge Bound Academics primary orange
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: 'ABeeZee, Roboto, Helvetica, Arial, sans-serif',
  },
})

export default theme
