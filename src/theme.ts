import {
  createTheme,

} from '@mui/material/styles'

export const blue = '#2ea1ff'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Raleway',
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#fff',
    },
  },
})

export default theme
