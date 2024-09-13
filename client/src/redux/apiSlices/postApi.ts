import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const apolloUrl = process.env.NEXT_PUBLIC_BACKEND_APOLLO;

export const getAllPostQueryApi = createApi({
  reducerPath: "getAllPostQueryApi",
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
                }
                user {
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
  }),
});

export const { useGetAllPostQuery } = getAllPostQueryApi;