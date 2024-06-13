// theme.ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0064FF',
      contrastText: '#fff',
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(229, 231, 236, 0.4)',
          backdropFilter: 'blur(2px)',
        },
      },
    },
  },
})
