import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const url = process.env.NEXT_PUBLIC_BACKEND_URL
const apolloUrl = process.env.NEXT_PUBLIC_BACKEND_APOLLO

export const userQueryApi = createApi({
    reducerPath: 'userQueryApi',
    baseQuery: fetchBaseQuery({ baseUrl: apolloUrl }),
    endpoints: (builder) => ({
        
    }),
});