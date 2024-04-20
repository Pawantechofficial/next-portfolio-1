import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminProduct = createApi({
  reducerPath: "AdminProduct",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/product" }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (object) => ({
        url: "/add-product",
        method: "POST",
        body: object,
      }),
    }),

    getProducts: builder.query({
      query: (object) => ({
        url: "/get-product",
        method: "GET",
      }),
    }),
    editProduct: builder.mutation({
      query: (object) => ({
        url: "/edit-product",
        method: "PUT",
        body: { id: object },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (object) => ({
        url: "/delete-product",
        method: "POST",
        body: { id: object },
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} = AdminProduct;
