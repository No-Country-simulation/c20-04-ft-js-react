import { createSlice } from '@reduxjs/toolkit'
import type { User } from '@/types'

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null, // Inicialmente no hay usuario autenticado
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
    setPreviewProfilePicture: (state,action: {payload: string})=> {
      if(state.user){
        state.user.profile_photo = action.payload;
      }
    }
  },
});

export const { setUser, setPreviewProfilePicture } = userSlice.actions;
export default userSlice.reducer;