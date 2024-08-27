"use client"

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#c4b1ff',
      main: '#8c52ff',
      dark: '#4e169c',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#a885ff',
      main: '#7f30f7',
      dark: '#300b6a',
      contrastText: '#ffffff',
    },
  },
});

export default theme;
