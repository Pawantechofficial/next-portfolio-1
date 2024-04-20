import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PublicQuery = createApi({
  reducerPath: "PublicQuery",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/public" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (object) => ({
        url: "/get-categories",
        method: "GET",
      }),
    }),
    getProducts: builder.query({
      query: (object) => ({
        url: `product/${object}`,
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: (object) => ({
        url: `product/${object.slug}/${object.product}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = PublicQuery;
