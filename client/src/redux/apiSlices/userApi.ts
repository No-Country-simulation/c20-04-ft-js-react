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
            query: (formData) => {
              // Log the formData for debugging
              console.log("FormData being sent:", formData);
          
              return {
                url: `profileUpDate`,
                method: "PUT",
                body: formData, // Send the formData as the body
              };
            },
          }),

        updateAboutInfo: builder.mutation({
            query: (reqbody)=> ({
                url: `profileUpDate`,
                method: "PUT",
                body: reqbody,
            })
        }),
        followUser: builder.mutation({
            query: (id)=> ({
                url: `follow/${id}`,
                method: "POST",
                credentials: "include"
            })
        }),
        unFollowUser: builder.mutation({
            query: (id)=> ({
                url: `unfollow/${id}`,
                method: "POST",
                credentials: "include"
            })
        }),
        
    }),
});

export const {useGetUserByUsernameQuery, useUpdateProfileInfoMutation, useUpdateAboutInfoMutation, useFollowUserMutation, useUnFollowUserMutation} = userApi