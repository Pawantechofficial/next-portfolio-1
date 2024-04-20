"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { MdEditNote } from "react-icons/md";
import { FcIcons8Cup } from "react-icons/fc";
import {
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../provider/redux/query/AdminCategory.query";
import { toast } from "react-toastify";

const CategoryCard = ({ data, index, refetch }) => {
  const [editCategory, editCategoryResponse] = useEditCategoryMutation();
  const [deleteCategory, deleteCategoryResponse] = useDeleteCategoryMutation();
  const id = data?._id;

  const EditCategoryHandler = async () => {
    try {
      const { data, error } = await editCategory(id);
      if (error) {
        toast.error(error.data?.error);
        return;
      } else {
        toast.success(data?.msg);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const DeleteCategoryHandler = async () => {
    try {
      const { data, error } = await deleteCategory(id);
      if (error) {
        toast.error(error.data?.error);
        return;
      } else {
        toast.success(data?.msg);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr>
      <td className="border text-center w-full">{index}</td>
      <td className="border text-center">{data?.name}</td>
      <td className="border">
        <div className="w-full h-full flex justify-center items-center ">
          <Image
            src={data?.image?.image_url}
            alt={`category` + data?._id}
            height={200}
            width={200}
            className="w-12 justify-center items-center flex"
          />
        </div>
      </td>
      <td className="border">
        <div className="w-full h-full flex justify-center items-center ">
          {data?.isPublish ? (
            <FcCheckmark className="text-center" />
          ) : (
            <FcCancel className="text-center" />
          )}
        </div>
      </td>
      <td className="border ">
        <div className="w-full h-full flex gap-2 items-center justify-center text-center ">
          <div className="w-full h-full flex lg:hidden justify-center items-center ">
            <button
              onClick={EditCategoryHandler}
              disabled={editCategoryResponse.isLoading}
              className="w-full h-full lg:hidden text-blue-500"
            >
              <MdEditNote className="text-center h-8 w-8" />
            </button>

            <button
              onClick={DeleteCategoryHandler}
              disabled={deleteCategoryResponse.isLoading}
              className="w-full h-full lg:hidden"
            >
              <FcIcons8Cup className="text-center h-8 w-8" />
            </button>
          </div>
          <button
            onClick={EditCategoryHandler}
            disabled={editCategoryResponse.isLoading}
            className="bg-blue-500 py-1 px-2 hidden lg:block  rounded text-white"
          >
            {editCategoryResponse.isLoading
              ? "Updating..."
              : `${data?.isPublish ? "UnPublish" : "Publish"}`}
          </button>

          <button
            onClick={DeleteCategoryHandler}
            disabled={deleteCategoryResponse.isLoading}
            className="bg-blue-500 py-1 px-2 hidden lg:block rounded text-white"
          >
            {deleteCategoryResponse.isLoading ? "Loading..." : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
};

const AllCategory = () => {
  const { isLoading, data, isError, refetch } = useGetCategoriesQuery();
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong.</div>;
  }
  return (
    <>
      <table className="w-full border table-fixed">
        <thead>
          <tr>
            <th className="border" scope="rows">
              ID
            </th>
            <th className="border" scope="rows">
              Name
            </th>
            <th className="border" scope="rows">
              Image
            </th>
            <th className="border" scope="rows">
              Public
            </th>
            <th className="border" scope="rows">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.category &&
            data.category.length > 0 &&
            data.category.map((cur, i) => {
              return (
                <CategoryCard
                  data={cur}
                  index={i + 1}
                  refetch={refetch}
                  key={i}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AllCategory;
