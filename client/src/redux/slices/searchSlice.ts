import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: false,
  reducers: {
    toggleSearch: (state) => !state
  }
})

export const { toggleSearch } = searchSlice.actions
export default searchSlice.reducer