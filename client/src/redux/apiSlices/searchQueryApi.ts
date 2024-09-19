import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_APOLLO;

export const searchQueryApi = createApi({
  reducerPath: "searchQueryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (username) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query ($username: String!) {
              getUserSearch(username: $username) {
                id
                name
                username
              }
            }
          `,
          variables: {
            username,
          },
        },
      }),
    }),
  }),
});

export const { useGetSuggestionsQuery } = searchQueryApi;
