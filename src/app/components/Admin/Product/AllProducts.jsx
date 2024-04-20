"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { MdEditNote } from "react-icons/md";
import { FcIcons8Cup } from "react-icons/fc";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../../../../provider/redux/query/AdminProduct.query";
import { toast } from "react-toastify";

const ProductCard = ({ data, index, refetch }) => {
  const [editProduct, editProductResponse] = useEditProductMutation();
  const [deleteProduct, deleteProductResponse] = useDeleteProductMutation();
  const id = data?._id;

  const EditProductHandler = async () => {
    try {
      const { data, error } = await editProduct(id);
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

  const DeleteProductHandler = async () => {
    try {
      const { data, error } = await deleteProduct(id);
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
      {/* image */}
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
      {/* is publish */}
      <td className="border">
        <div className="w-full h-full flex justify-center items-center ">
          {data?.isPublish ? (
            <FcCheckmark className="text-center" />
          ) : (
            <FcCancel className="text-center" />
          )}
        </div>
      </td>
      <td className="border text-center">{data?.category?.name}</td>
      <td className="border text-center">{data?.discount}</td>
      <td className="border text-center">{data?.price}</td>
      {/* button */}
      <td className="border ">
        <div className="w-full h-full flex gap-2 items-center justify-center text-center ">
          <div className="w-full h-full flex justify-center items-center ">
            <button
              onClick={EditProductHandler}
              disabled={editProductResponse.isLoading}
              className="w-full h-full text-blue-500"
            >
              <MdEditNote className="text-center h-8 w-8" />
            </button>

            <button
              onClick={DeleteProductHandler}
              disabled={deleteProductResponse.isLoading}
              className="w-full h-full"
            >
              <FcIcons8Cup className="text-center h-8 w-8" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

const AllProducts = () => {
  const { isLoading, data, isError, refetch } = useGetProductsQuery();
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
              Category
            </th>
            <th className="border" scope="rows">
              Discount
            </th>
            <th className="border" scope="rows">
              Price
            </th>
            <th className="border" scope="rows">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.product &&
            data.product.length > 0 &&
            data.product.map((cur, i) => {
              return (
                <ProductCard
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

export default AllProducts;
