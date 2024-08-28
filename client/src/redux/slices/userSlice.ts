import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {},
    counter: 0
}

const userSlice = createSlice({
    // el nombre que usaremos para llamar al estado global de este slice y ver sus props
    name: "user",
    initialState,
    reducers: {
        updateCounter: (state,action)=> {
            state.counter = state.counter + action.payload
        },
    }
})

export const {updateCounter} = userSlice.actions
export default userSlice.reducer