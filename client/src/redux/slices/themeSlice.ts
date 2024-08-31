import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeType = 'system' | 'light' | 'dark'

const userSlice = createSlice({
  name: 'user',
  initialState: 'system',
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      localStorage.setItem('selectedTheme', action.payload)
      return action.payload
    }
  }
})

export const { setTheme } = userSlice.actions
export default userSlice.reducer