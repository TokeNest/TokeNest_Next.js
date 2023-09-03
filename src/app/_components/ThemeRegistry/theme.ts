import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    activate: Palette['primary']
  }
  interface PaletteOptions {
    activate?: PaletteOptions['primary']
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    activate: true
  }
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#344955',
      light: '#4A6572',
      dark: '#232F34',
    },
    secondary: {
      main: '#F9AA33',
    },
    activate: {
      light: '#81c784',
      main: '#81c784',
      dark: '#81c784',
      contrastText: '#2e7d33',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
