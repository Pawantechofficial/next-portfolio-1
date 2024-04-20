import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminCategory = createApi({
  reducerPath: "AdminCategory",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/category" }),
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (object) => ({
        url: "/add-category",
        method: "POST",
        body: object,
      }),
    }),
    getCategories: builder.query({
      query: (object) => ({
        url: "/get-category",
        method: "GET",
      }),
    }),

    editCategory: builder.mutation({
      query: (object) => ({
        url: "/edit-category",
        method: "PUT",
        body: { id: object },
      }),
    }),

    deleteCategory: builder.mutation({
      query: (object) => ({
        url: "/delete-category",
        method: "POST",
        body: { id: object },
      }),
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = AdminCategory;
