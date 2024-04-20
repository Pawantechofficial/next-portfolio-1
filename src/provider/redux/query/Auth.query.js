import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (object) => ({
        url: "/register",
        method: "POST",
        body: object,
      }),
    }),
    loginUser: builder.mutation({
      query: (object) => ({
        url: "/login",
        method: "POST",
        body: object,
      }),
    }),

    userProfile: builder.query({
      query: (object) => ({
        url: "/profile",
        method: "GET",
      }),
    }),
    logoutUser: builder.mutation({
      query: (object) => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserProfileQuery,
  useLogoutUserMutation,
} = AuthApi;
