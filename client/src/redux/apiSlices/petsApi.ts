import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const petsApi = createApi({
    reducerPath: "petsApi",
    baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include"}),
    endpoints: (builder)=> ({
        getPetsByUsername: builder.query({
            query: (username) => ({
                url: "",
                method: "POST",
                credentials: "include",
                body: {

                }
            })
        }),
        uploadPet: builder.mutation({
            query: (pet)=> ({
                url: "createPets",
                method: "POST",
                body: pet,
            })
        }),
    })
})

export const { useGetPetsByUsernameQuery, useUploadPetMutation } = petsApi;