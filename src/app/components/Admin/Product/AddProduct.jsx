"use client";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../../../../provider/redux/query/AdminCategory.query";
import { useAddProductMutation } from "../../../../provider/redux/query/AdminProduct.query";

const AddProduct = () => {
  const [addProductFn, addProductFnResponse] = useAddProductMutation();
  const { isLoading, data, isError, refetch } = useGetCategoriesQuery();

  useEffect(() => {
    refetch();
  }, []);

  const validationSchema = yup.object({
    categoryName: yup.string().required("Category must be select"),
    productName: yup.string().required("Product Name is Required"),
    shortDescription: yup
      .string()
      .min(10, "short des. 10 to 50 characters")
      .max(50, "short des. 10 to 50 characters")
      .required("Short description is Required"),
    longDescription: yup
      .string()
      .min(60, "Long des. 60 to 300 characters")
      .max(300, "Long des. 60 to 300 characters")
      .required("Long description is Required"),
    rating: yup
      .number()
      .min(0, "Rating must be 0 to 5")
      .max(5, "Rating must be 0 to 5")
      .required("Product Rating is Required"),
    price: yup
      .number()
      .min(1, "Price minimum 1 is Required")
      .required("Product Price is Required"),
    discount: yup
      .number()
      .min(0, "Discount should be 0 to 100%")
      .max(100, "Discount should be 0 to 100%"),
    image: yup.mixed().required("category image Required"),
  });
  const initialValues = {
    categoryName: "",
    productName: "",
    rating: "",
    image: null,
    price: "",
    discount: "",
    shortDescription: "",
    longDescription: "",
  };
  const onSubmitHandler = async (e, { resetForm }) => {
    try {
      const form = new FormData();
      form.append("image", e.image);
      form.append("category_name", e.categoryName);
      form.append("productName", e.productName);
      form.append("rating", e.rating);
      form.append("price", e.price);
      form.append("discount", e.discount);
      form.append("shortDescription", e.shortDescription);
      form.append("longDescription", e.longDescription);

      const { data, error } = await addProductFn(form);
      if (error) {
        toast.error(error.data?.error);
        return;
      }
      toast.success(data?.msg);

      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="flex flex-wrap mb-6">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Select Category
                </label>
                <Field
                  as="select"
                  name={"categoryName"}
                  className="appearance-none block w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  placeholder="Birthday"
                >
                  <option value={""}>select category</option>
                  {isLoading && <option disabled>loading...</option>}
                  {!isLoading &&
                    data &&
                    data.category &&
                    data.category.length > 0 &&
                    data.category.map((cur, i) => {
                      return (
                        <option key={i} value={cur._id}>
                          {cur.name}
                        </option>
                      );
                    })}
                </Field>
                <ErrorMessage
                  name="categoryName"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product Name
                </label>
                <Field
                  name={"productName"}
                  className="appearance-none block w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Birthday"
                />

                <ErrorMessage
                  name="productName"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product Image
                </label>
                <input
                  onChange={(e) => {
                    setFieldValue("image", e.target.files[0]);
                  }}
                  name={"image"}
                  className="appearance-none block w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="file"
                  placeholder="Birthday"
                />
                <ErrorMessage
                  name="image"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product Rating
                </label>
                <Field
                  name={"rating"}
                  className="appearance-none block w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="number"
                  placeholder="4.5"
                />
                <ErrorMessage
                  name="rating"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product Price
                </label>
                <Field
                  name={"price"}
                  className="appearance-none block w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="number"
                  placeholder="499"
                />
                <ErrorMessage
                  name="price"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product Short Description
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  name={"shortDescription"}
                  className="appearance-none block resize-none w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Short description"
                />
                <ErrorMessage
                  name="shortDescription"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product Long Description
                </label>
                <Field
                  as="textarea"
                  rows={5}
                  name={"longDescription"}
                  className="appearance-none block w-full resize-none text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Long description"
                />
                <ErrorMessage
                  name="longDescription"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide appearance-none text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Product{`discount percent %`}
                </label>
                <Field
                  name={"discount"}
                  className="appearance-none block w-full text-gray-700 ring-black ring-[.3px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="number"
                  placeholder="20%"
                />
                <ErrorMessage
                  name="discount"
                  component={"p"}
                  className="text-red-500"
                />
              </div>

              <div className="w-full flex justify-center md:justify-start px-3 mb-6 md:mb-0">
                <button
                  disabled={addProductFnResponse.isLoading}
                  type="submit"
                  className="text-white w-full md:w-[120px] bg-blue-500 py-1 px-2 rounded"
                >
                  {addProductFnResponse.isLoading
                    ? "Loading..."
                    : "Add Product"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddProduct;
