import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../../../lib/config/dbConnect";
import { ApiError } from "../../../../../../lib/utils/apiError";
import httpStatus from "http-status";
import { ProductModel } from "../../../../../../lib/models/product.models";
ConnectDB();
export const GET = async (
  request: NextRequest,
  ctx: { params: { product: string } }
) => {
  try {
    const existProduct = await ProductModel.findOne({
      slug: ctx.params.product,
    }).populate("category","name -_id");
    if (!existProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    return NextResponse.json({
      msg: "Product fetched",
      product: existProduct,
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
