import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const apolloUrl = process.env.NEXT_PUBLIC_BACKEND_APOLLO;

export const getPostQueryApi = createApi({
  reducerPath: "getPost",
  baseQuery: fetchBaseQuery({ baseUrl: apolloUrl }),
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query {
              getPost {
                _id
                text
                likereport
                url_img
                createdAt
                comment {
                  text
                  user {
                    name
                    username
                    profile_photo
                  }
                }
                user {
                  _id
                  name
                  username
                  profile_photo
                }
              }
            }
          `,
        },
      }),
    }),
    getAllPostByUsername: builder.query({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query ($username: String!) {
              getAllPostByUsername(username: $username) {
                _id
                text
                likereport
                url_img
                createdAt
                comment {
                  text
                  user {
                    name
                    username
                    profile_photo
                  }
                }
                user {
                  _id
                  name
                  username
                  profile_photo
                }
              }
            }
          `,
          variables: {
            username: username
          },
        },
      }),
    }),
  }),
});

export const { useGetAllPostQuery, useGetAllPostByUsernameQuery } = getPostQueryApi;