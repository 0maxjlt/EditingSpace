import { createTheme } from '@mui/material/styles'
import { colors } from './palette'

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: colors.deepTeal,
      contrastText: '#ffffff',
    },

    secondary: {
      main: colors.mutedTeal,
    },

    background: {
      default: colors.ashGrey,
      paper: '#292929',
    },

    text: {
      primary: colors.charcoalBlue,
      secondary: colors.darkSlateGrey,
    },
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    button: { textTransform: 'none' },
  },

  shape: {
    borderRadius: 10,
  },
})

export default theme
