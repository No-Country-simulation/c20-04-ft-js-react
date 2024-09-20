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
                description
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
    getAboutProperties: builder.query({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query ($username: String!) {
              getUserByUsername(username: $username) {
                tags
                description
                address
                contact
                createdAt
              }
            }
          `,
          variables: {
            username,
          },
        },
      }),
    }),
    getUserByUsername: builder.mutation({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query ($username: String!) {
              getUserByUsername(username: $username) {
                name
                profile_photo
                username
                _id
              }
            }
          `,
          variables: {
            username,
          },
        },
      }),
    }),
    getUserSearch: builder.mutation({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
          query($username: String!){getUserSearch(username: $username) {
            name
            profile_photo
            username
            _id
          }}
          `,
          variables: {
            username,
          },
        },
      }),
    }),
    getUserFollowers: builder.query({
      query: (username) => ({
        url: "",
        method: "POST",
        credentials: "include",
        body: {
          query: `
            query ($username: String!) {
              getUserByUsername(username: $username) {
                followers
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

export const { useGetProfilePropertiesQuery, useGetAboutPropertiesQuery, useGetUserByUsernameMutation, useGetUserFollowersQuery, useGetUserSearchMutation } = userQueryApi;
