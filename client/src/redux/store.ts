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
    //concatenamos los apiSlices que usamos para hacer las peticiones a nuestro backend
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, authApi.middleware)
})

// typescript necesita el root state para poder saber que tipo de valores estamos asignando en nuestro estado global, de otra forma, no podra leerlos
export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch

export default store;