import { VerifyAdmin } from "../../../../../lib/middlewares/verifyAdmin.middleware";
import { isAuth } from "../../../../../lib/middlewares/verifyUser.middleware";
import { ProductModel } from "../../../../../lib/models/product.models";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);
    const admin = await VerifyAdmin(user);

    if (!admin) {
      throw new ApiError(httpStatus.BAD_REQUEST, "can not access this route");
    }
    const data = await request.json();
    const product = await ProductModel.findByIdAndUpdate(data?.id);
    if (!product) {
      throw new ApiError(httpStatus.BAD_REQUEST, "product not exist");
    }
    if (product?.isPublish) {
      await ProductModel.findByIdAndUpdate(product?._id, {
        isPublish: false,
      });
      return NextResponse.json({ msg: "product UnPublished" });
    }
    await ProductModel.findByIdAndUpdate(product?._id, {
      isPublish: true,
    });
    return NextResponse.json({ msg: "Product Published" });
  } catch (error: any) {
    const response = NextResponse.json(
      { code: error.statusCode || 500, error: error.message },
      {
        status: error.statusCode || 500,
      }
    );

    return response;
  }
};
