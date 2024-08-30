import {createSlice} from '@reduxjs/toolkit'

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
  }
  
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
    },
  });
  
  export const { setUser } = userSlice.actions;
  export default userSlice.reducer;