"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { useLoginUserMutation } from "../../provider/redux/query/Auth.query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const page = () => {
  const [LoginUser, LoginUserResponse] = useLoginUserMutation();
  const router = useRouter();
  const validationSchema = yup.object({
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
      const { data, error } = await LoginUser(e);
      if (error) {
        toast.error(error?.data?.error);
        return;
      }
      toast.success(data?.msg);
      router.push("/");
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
      >
        <Form className=" bg-white w-full sm:w-[400px] h-full p-4 rounded mx-auto">
          <div className="flex justify-center">
            <h1 className="text-xl">Login</h1>
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
          <div className=" mb-3 w-full flex justify-between">
            <button
              type="submit"
              disabled={LoginUserResponse.isLoading}
              className="px-2 py-1 w-1/2 rounded bg-[#48CAE4] text-white"
            >
              {LoginUserResponse.isLoading ? (
                <CgSpinner className="text-white text-center" />
              ) : (
                "Login"
              )}
            </button>
            <Link href={"/"} className="text-zinc-900 hover:text-[#48CAE4] ">
              Forget Password
            </Link>
          </div>
          <div className="flex gap-2 text-sm justify-between">
            <Link href={"/register"}>
              <p className="text-center text-sm flex justify-center">
                Don't have an account?{" "}
                <span className="text-primary ml-2"> Register</span>
              </p>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default page;
