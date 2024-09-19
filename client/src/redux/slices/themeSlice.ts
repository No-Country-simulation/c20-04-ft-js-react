import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeType = 'system' | 'light' | 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'system',
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      localStorage.setItem('selectedTheme', action.payload)
      return action.payload
    }
  }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer