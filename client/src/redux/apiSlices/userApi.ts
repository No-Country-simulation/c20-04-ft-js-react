import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const url = "aqui va la url base del backend"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: url}),
    endpoints: (builder)=> ({

    })
})