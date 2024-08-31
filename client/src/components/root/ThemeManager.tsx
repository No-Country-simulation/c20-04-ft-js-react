'use client'

import { CssBaseline, ThemeProvider, useMediaQuery, type PaletteMode } from "@mui/material"
import { getMUITheme } from "@/theme";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { setTheme, type ThemeType } from "@/redux/slices/themeSlice";

// Funcion para obtener el thema selecionado, encaso de que no haya devuelve 'system'
function getSelectedTheme() {
  if (typeof localStorage === 'undefined') return 'system'
  const selectedTheme = localStorage.getItem('selectedTheme')

  return selectedTheme ?? 'system'
}

export default function ThemeManager({ children }: { children: React.ReactNode }) {
  const selectedTheme = getSelectedTheme()
  // Se obtiene true si el dark mode esta activo en el dipositivo
  const isDarkSystem = useMediaQuery('(prefers-color-scheme: dark)')
  // Se obtiene el tema selecionado
  const theme = useAppSelector(state => state.theme)
  // Estado del tema para MaterialUI
  const [themeMode, setThemeMode] = useState<PaletteMode>('light')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectedTheme === 'system') {
      setThemeMode(isDarkSystem ? 'dark' : 'light')
    } else {
      setThemeMode(selectedTheme as PaletteMode)
    }

    dispatch(setTheme(selectedTheme as ThemeType))
  }, [selectedTheme, isDarkSystem, dispatch])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlClasses = document.documentElement.classList
      const htmlContainDark = htmlClasses.contains('dark')
      const htmlAddDark = () => htmlClasses.add('dark')
      const htmlRemoveDark = () => htmlClasses.remove('dark')

      if (theme === 'system') {
        if (isDarkSystem) htmlAddDark()
        else if (htmlContainDark) htmlRemoveDark()
      } else if (theme === 'dark') htmlAddDark()
      else if (htmlContainDark) htmlRemoveDark()
    }
  }, [theme, isDarkSystem])

  console.log({ theme })

  const MUITheme = getMUITheme(themeMode)

  return (
    <ThemeProvider theme={MUITheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}