import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const apolloUrl = process.env.NEXT_PUBLIC_BACKEND_APOLLO;

export const userQueryApi = createApi({
  reducerPath: "userQueryApi",
  baseQuery: fetchBaseQuery({ baseUrl: apolloUrl }),
  endpoints: (builder) => ({
    getProfileProperties: builder.query({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query ($username: String!) {
              getUserByUsername(username: $username) {
                _id
                followers
                following
                name
                profile_photo
                username
                posts {
                  _id
                  text
                  url_img
                }
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

export const { useGetProfilePropertiesQuery } = userQueryApi;
