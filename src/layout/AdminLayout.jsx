"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useUserProfileQuery } from "../provider/redux/query/Auth.query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  let menuArray = [true, false, false];
  const [menu, setMenu] = useState(menuArray);
  const [show, setShow] = useState(true);
  const { data, isLoading } = useUserProfileQuery();
  const router = useRouter();
  useEffect(() => {
    if (data && data.user.role === "user") {
      router.replace("/");
    } else if (!data && !isLoading) {
      router.replace("/");
    } else if (data && data.user && data.user.role === "admin") {
      setLoading(false);
    }
  }, [data, isLoading]);

  if (isLoading || loading) {
    return <div>loading</div>;
  }
  if (!data) {
    router.push("/");
  }
  const setMenuValue = (props) => {
    let newArr = [...menu];
    newArr[props] = !newArr[props];
    setMenu(newArr);
  };

  const SingleMenu = ({ Icon, title, path }) => {
    return (
      <Link
        href={`/admin/${path}`}
        className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded "
      >
        <Icon className="text-2xl" />
        <p className="text-base leading-4 ">{title}</p>
      </Link>
    );
  };

  const MegaNavigation = ({ title, items }) => {
    const [menu, setMenuValue] = useState(false);
    return (
      <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
        <button
          onClick={() => setMenuValue(!menu)}
          className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  "
        >
          <p className="text-sm leading-5  uppercase">{title}</p>
          <FaAngleDown
            className={`${
              menu ? "" : "rotate-180"
            } transform text-2xl duration-100`}
          />
        </button>
        <div
          id="menu1"
          className={`${
            menu ? "flex" : "hidden"
          } justify-start  flex-col w-full md:w-auto items-start pb-1 `}
        >
          {items.map((c, i) => {
            return (
              <Link
                key={i}
                href={`/admin` + c.path}
                className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52"
              >
                <c.Icon className="text-2xl" />
                <p className="text-base leading-4  ">{c.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="z-50">
      <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
        <div className="flex justify-between  items-center space-x-3">
          <p className="text-2xl leading-6 text-white">Cake Shop</p>
        </div>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button
            aria-label="open"
            id="open"
            onClick={() => setShow(true)}
            className={`${
              show ? "hidden" : ""
            } focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 18H20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="close"
            id="close"
            onClick={() => setShow(false)}
            className={`${
              show ? "" : "hidden"
            } focus:outline-none focus:ring-2`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div
          id="Main"
          className={`${
            show ? "translate-x-0 z-10" : "-translate-x-full z-0"
          } xl:rounded-r transform fixed md:relative  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-screen overflow-y-auto  w-full sm:w-64 bg-gray-900 flex-col`}
        >
          <div className="hidden xl:flex justify-start p-6 items-center space-x-3">
            <p className="text-2xl leading-6 text-white">Cake Shop</p>
          </div>
          <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
            {/* button */}
            <SingleMenu Icon={MdDashboard} title={"Dashboard"} path={"/"} />
            <SingleMenu Icon={FaUser} title={"User"} path={"/users"} />
          </div>
          {/* mega navigation */}
          <MegaNavigation
            title={"Category"}
            items={[
              {
                path: "/categories/add-category",
                Icon: BiCategory,
                title: "Add Category",
              },
            ]}
          />

          <MegaNavigation
            title={"Products"}
            items={[
              {
                path: "/products/addProduct",
                Icon: CiShoppingCart,
                title: "Add Product",
              },
            ]}
          />
        </div>
        <div className="w-full mx-auto justify-center">{children}</div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AdminLayout));
