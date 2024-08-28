import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {},
    counter: 0
}

const userSlice = createSlice({
    // el nombre que usaremos para llamar al estado global de este slice y ver sus props
    name: "user",
    initialState,
    //aca los distintos seteadores del estado, que usaremos para cambiar el valor de lo que ocupemos, con lo que recibimos por payload
    reducers: {
        updateCounter: (state,action)=> {
            state.counter = state.counter + action.payload
        },
    }
})

export const {updateCounter} = userSlice.actions
// este export es para poder usarlo en la store
export default userSlice.reducer