import { CategoryModel } from "@/src/lib/models/category.models";
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/src/lib/config/dbConnect";
import { ApiError } from "@/src/lib/utils/apiError";
import httpStatus from "http-status";
import { ProductModel } from "@/src/lib/models/product.models";
ConnectDB();
export const GET = async (
  request: NextRequest,
  ctx: { params: { slug: string } }
) => {
  try {
    const existCategory = await CategoryModel.findOne({
      slug: ctx.params.slug,
    });
    if (!existCategory) {
      throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    }
    const AllProducts = await ProductModel.find({
      category: existCategory._id,
      isPublish: true,
    }).populate("category", "name -_id");

    return NextResponse.json({
      msg: "Product fetched",
      AllProducts,
      total: AllProducts.length,
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
