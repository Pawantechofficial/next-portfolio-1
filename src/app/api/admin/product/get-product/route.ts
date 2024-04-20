import { VerifyAdmin } from "../../../../..//lib/middlewares/verifyAdmin.middleware";
import { isAuth } from "../../../../../lib/middlewares/verifyUser.middleware";
import { ProductModel } from "../../../../../lib/models/product.models";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);
    const admin = await VerifyAdmin(user);

    if (!admin) {
      throw new ApiError(httpStatus.BAD_REQUEST, "can not access this route");
    }

    const product = await ProductModel.find({})
      .populate("category", "name -_id")
      .select(
        "name image.image_url isPublish short_disc long_disc price discount rating"
      );

    return NextResponse.json({
      msg: "product fetched",
      product,
      total: product.length,
    });
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
