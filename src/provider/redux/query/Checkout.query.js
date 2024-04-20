import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CheckoutQuery = createApi({
  reducerPath: "CheckoutQuery",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/checkout" }),
  endpoints: (builder) => ({
    checkoutPayment: builder.mutation({
      query: (object) => ({
        url: "/add-checkout",
        method: "POST",
        body: object,
      }),
    }),
    checkPayment: builder.mutation({
      query: (object) => ({
        url: "/verify-checkout",
        method: "POST",
        body: { token: object },
      }),
    }),
  }),
});

export const { useCheckoutPaymentMutation, useCheckPaymentMutation } =
  CheckoutQuery;
