import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = 'system' | 'light' | 'dark'

const userSlice = createSlice({
  name: 'user',
  initialState: 'system',
  reducers: {
    toggleTheme: (state, action: PayloadAction<SliceState>) => action.payload
  }
})

export const { toggleTheme } = userSlice.actions
export default userSlice.reducer