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
    },
    setAnyUserProp: (state: UserState, action: { payload: { propToChange: keyof User, value: any } }) => {
      const { propToChange, value } = action.payload;
    
      if (state.user) {
        state.user[propToChange] = value;
      }
    }
  },
});

export const { setUser, setPreviewProfilePicture, setAnyUserProp } = userSlice.actions;
export default userSlice.reducer;