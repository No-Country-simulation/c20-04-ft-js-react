import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        credentials: 'include', // Asegúrate de incluir las credenciales en las solicitudes
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (reqbody) => ({
                url: 'register',
                method: "POST",
                body: reqbody,
            }),
        }),
        login: builder.mutation({
            query: (reqbody) => ({
                url: "login",
                method: "POST",
                body: reqbody,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: 'refreshToken',
                method: 'POST',
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = authApi;