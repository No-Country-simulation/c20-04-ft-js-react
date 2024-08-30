import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

const userSlice = createSlice({
    // el nombre que usaremos para llamar al estado global de este slice y ver sus props
    name: "user",
    initialState,
    //aca los distintos seteadores del estado, que usaremos para cambiar el valor de lo que ocupemos, con lo que recibimos por payload
    reducers: {
        setUser: (state,action)=> {
            state.user = action.payload
        },
    }
})

export const {setUser} = userSlice.actions
// este export es para poder usarlo en la store
export default userSlice.reducer