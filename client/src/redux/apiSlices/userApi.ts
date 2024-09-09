import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        
        getUserByUsername: builder.query({
            query: (username)=> ({
                url: `users/${username}`,
                method: "GET"
            })
        }),

        updateProfileInfo: builder.mutation({
            query: (reqbody)=> ({
                url: `/profileUpDate`,
                method: "POST",
                body: reqbody,
            })
        })
        
    }),
});

export const {useGetUserByUsernameQuery, useUpdateProfileInfoMutation} = userApi