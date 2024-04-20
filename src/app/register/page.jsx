"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { useRegisterUserMutation } from "../../provider/redux/query/Auth.query";
import { toast } from "react-toastify";
const page = () => {
  const [RegisterUser, RegisterUserResponse] = useRegisterUserMutation();
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name must be require")
      .trim()
      .min(3, "Name should greater than 3 characters"),
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email must be require")
      .trim()
      .lowercase(),
    password: yup
      .string()
      .required("Password must be require")
      .trim()
      .min(8, "Password should greater than 8 characters"),
  });

  const onSubmitHandler = async (e, { resetForm }) => {
    try {
      const { data, error } = await RegisterUser(e);
      if (error) {
        toast.error(error?.data?.error);
        return;
      }
      toast.success(data?.msg);
      resetForm();
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="flex flex-col min-h-screen w-full px-4 justify-center items-start bg-slate-100">
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmitHandler}
        resetForm
      >
        <Form className=" bg-white w-full sm:w-[400px] h-full p-4 rounded mx-auto">
          <div className="flex justify-center">
            <h1 className="text-xl">Register</h1>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              name="name"
              id="name"
              className="w-full border-none outline-none px-2 items-center ring-black ring-[.3px] h-8 rounded py-3"
              placeholder="Enter your name"
            />
            <ErrorMessage
              component={"p"}
              className="text-red-500"
              name="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              id="email"
              className="w-full border-none outline-none px-2 items-center ring-black ring-[.3px] h-8 rounded py-3"
              placeholder="Enter your email"
            />
            <ErrorMessage
              component={"p"}
              className="text-red-500"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              className="w-full border-none  flex outline-none px-2 items-center ring-black ring-[.3px] h-8 rounded py-3"
              placeholder="**********"
            />
            <ErrorMessage
              component={"p"}
              className="text-red-500"
              name="password"
            />
          </div>
          <div className=" mb-3 mt-5 w-full flex justify-center">
            <button
              type="submit"
              disabled={RegisterUserResponse.isLoading}
              className="px-2 py-1 w-full rounded bg-[#48CAE4] text-white"
            >
              {RegisterUserResponse.isLoading ? (
                <CgSpinner className="text-white" />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <div className="flex gap-2 text-sm justify-between">
            <Link href={"/login"}>
              <p className="text-center text-sm flex justify-center">
                Already have an account?{" "}
                <span className="text-[#48CAE4] ml-2"> Login</span>
              </p>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default page;
