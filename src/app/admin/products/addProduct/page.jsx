"use client";
import React, { lazy, useState, Suspense } from "react";
const AddProduct = lazy(() =>
  import("../../../components/Admin/Product/AddProduct")
);
const AllProducts = lazy(() =>
  import("../../../components/Admin/Product/AllProducts")
);
const Page = () => {
  const [select, setselect] = useState(0);
  return (
    <>
      <div className="mb-4 py-10 mx-4 px-5">
        <ul className="flex gap-x-4">
          <li>
            <button
              onClick={() => setselect(0)}
              className="text-white rounded bg-blue-400 py-1 px-2"
            >
              Add Product
            </button>
          </li>
          <li>
            <button
              onClick={() => setselect(1)}
              className="text-white rounded bg-blue-400 py-1 px-2"
            >
              All Products
            </button>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        {select === 0 ? <AddProduct /> : <AllProducts />}
      </Suspense>
    </>
  );
};

export default Page;
