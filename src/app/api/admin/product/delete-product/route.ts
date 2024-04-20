import { VerifyAdmin } from "../../../../../lib/middlewares/verifyAdmin.middleware";
import { isAuth } from "../../../../../lib/middlewares/verifyUser.middleware";
import { ProductModel } from "../../../../../lib/models/product.models";
import { DeleteImage } from "../../../../../lib/utils/cloudinary";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);
    const admin = await VerifyAdmin(user);

    if (!admin) {
      throw new ApiError(httpStatus.BAD_REQUEST, "can not access this route");
    }
    const data = await request.json();
    const product = await ProductModel.findById(data?.id);
    if (!product) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Product not exist");
    }

    if (product?.image?.cloudnary_public_id) {
      await DeleteImage(product?.image?.cloudnary_public_id);
    }
    await ProductModel.findByIdAndDelete(data?.id);

    return NextResponse.json({ msg: "Product Deleted" });
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
