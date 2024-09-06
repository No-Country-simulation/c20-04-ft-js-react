'use client'

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setTheme, type ThemeType } from "@/redux/slices/themeSlice";

export default function ThemeSwitcher() {
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setTheme(e.target.value as ThemeType))
  }

  return (
    <FormControl>
      <InputLabel id="theme-switcher">Theme</InputLabel>
      <Select
        labelId="theme-switcher"
        value={theme}
        label="Theme"
        onChange={handleChange}
      >
        <MenuItem value={'system'}>System</MenuItem>
        <MenuItem value={'light'}>Light</MenuItem>
        <MenuItem value={'dark'}>Dark</MenuItem>
      </Select>
    </FormControl>
  )
}