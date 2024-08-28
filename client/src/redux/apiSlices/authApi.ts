// este archivo sera usado para manejar todas las operaciones relacionadas al login y registro

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const url = "aqui va la url base del backend"

export const authApi = createApi({
    // el reducer path es importante para que lo podamos unir en la store
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: url}),
    endpoints: (builder) => ({
        
        register: builder.mutation({
            query: (reqbody) => ({
                url: 'register',
                method: "POST",
                body: reqbody
            })
        }),
        
        login: builder.mutation({
            query: (reqbody)=> ({
                url: "login",
                method: "POST",
                body: reqbody
            })
        })
    })
})

export const {useRegisterMutation ,useLoginMutation} = authApi