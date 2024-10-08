import { configureStore } from '@reduxjs/toolkit'

// import de los api's slices
import { authApi } from './apiSlices/authApi'
import { userApi } from './apiSlices/userApi'
import { userQueryApi } from './apiSlices/userQueryApi'
import { petsApi } from './apiSlices/petsApi'
import { searchQueryApi } from './apiSlices/searchQueryApi'
import { postQueryApi  } from './apiSlices/postApi'

//import de los slices van aca:
import userSlice from "./slices/userSlice"
import themeSlice from './slices/themeSlice'
import searchSlice from './slices/searchSlice'

const store = configureStore({
    reducer: {
        // los que manejan el contenido y estado global
        userReducer: userSlice,
        theme: themeSlice,
        search: searchSlice,

        // los que son para peticiones
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [userQueryApi.reducerPath]: userQueryApi.reducer,
        [searchQueryApi.reducerPath]: searchQueryApi.reducer,
        [postQueryApi.reducerPath]: postQueryApi.reducer,
        [petsApi.reducerPath]: petsApi.reducer
    },
    //concatenamos los apiSlices que usamos para hacer las peticiones a nuestro backend
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware, authApi.middleware,
        userQueryApi.middleware, postQueryApi.middleware, petsApi.middleware, searchQueryApi.middleware
    )
})

// typescript necesita el root state para poder saber que tipo de valores estamos asignando en nuestro estado global, de otra forma, no podra leerlos
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;