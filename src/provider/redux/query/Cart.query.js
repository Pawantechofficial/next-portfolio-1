import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/cart" }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (object) => ({
        url: "/add-cart",
        method: "POST",
        body: { id: object },
      }),
    }),
    getCarts: builder.query({
      query: (object) => ({
        url: "/get-cart",
        method: "GET",
      }),
    }),
    editCart: builder.mutation({
      query: (object) => ({
        url: "/edit-cart",
        method: "POST",
        body: { id: object.id, action: object.action },
      }),
    }),
  }),
});

export const { useAddToCartMutation, useGetCartsQuery, useEditCartMutation } =
  CartApi;
