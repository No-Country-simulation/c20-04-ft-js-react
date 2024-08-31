'use client'

import { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    primary: {
      light: '#c4b1ff',
      main: '#8c52ff',
      dark: '#4e169c',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#a885ff',
      main: '#7f30f7',
      dark: '#300b6a',
      contrastText: '#ffffff'
    }
  }
})

const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#7b51ff',
      main: '#bb9df7',
      dark: '#897a9e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#9c75fd',
      main: '#d7c3f5',
      dark: '#605a69',
      contrastText: '#ffffff',
    },
    mode: 'dark'
  }
})

export function getMUITheme(mode: PaletteMode) {
  return mode === 'dark' ? darkTheme : lightTheme
}
