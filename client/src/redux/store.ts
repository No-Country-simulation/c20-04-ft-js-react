import {configureStore} from '@reduxjs/toolkit'

// import de los api's slices
import {authApi} from './apiSlices/authApi'
import {userApi} from './apiSlices/userApi'

//import de los slices van aca:
import userSlice from "./slices/userSlice"

const store = configureStore({
    reducer: {
        // los que manejan el contenido y estado global
        userReducer: userSlice,

        // los que son para peticiones
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, authApi.middleware)
})

export default store;