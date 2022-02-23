import {
  createTheme,

} from '@mui/material/styles'

export const blue = '#2ea1ff'

const coreTheme = createTheme({
  typography: {
    fontFamily: 'Raleway',
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#000',
    },
    background: {
      default: '#000',
      paper: '#fff',
    },
    secondary: {
      main: '#fff',
    },

  },
})

const theme = {
  ...coreTheme,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          color: coreTheme.palette.primary.main,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: coreTheme.palette.primary.main,
          fieldset: {
            borderColor: coreTheme.palette.primary.main,
            legend: {
              maxWidth: '100%',
            },
          },
          '.MuiInputAdornment-positionStart p': {
            color: coreTheme.palette.primary.main,
          },
          ':hover': {
            'fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: blue,
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        // root: {

        // },
      },
    },
  },
}

export default theme
