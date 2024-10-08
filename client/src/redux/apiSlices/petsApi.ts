import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const petsApi = createApi({
  reducerPath: "petsApi",
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
  endpoints: (builder) => ({
    getPetsByUsername: builder.query({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query ($username: String!) {
              getPetsByUsername(username: $username) {
                description
                name
                profile_photo
                species
              }
            }
          `,
          variables: {
            username,
          }
        },
      }),
    }),
    uploadPet: builder.mutation({
      query: (formData) => ({
        url: "createPets",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetPetsByUsernameQuery, useUploadPetMutation } = petsApi;