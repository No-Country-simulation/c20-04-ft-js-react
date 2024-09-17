import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
    endpoints: (builder) => ({
        
        getUserByUsername: builder.query({
            query: (username)=> ({
                url: `users/${username}`,
                method: "GET"
            })
        }),

        updateProfileInfo: builder.mutation({
            query: (reqbody)=> ({
                url: `profileUpDate`,
                method: "PUT",
                body: reqbody,
            })
        }),

        updateAboutInfo: builder.mutation({
            query: (reqbody)=> ({
                url: `profileUpDate`,
                method: "PUT",
                body: reqbody,
            })
        })
        
    }),
});

export const {useGetUserByUsernameQuery, useUpdateProfileInfoMutation, useUpdateAboutInfoMutation} = userApi