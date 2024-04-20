import { CategoryModel } from "../../../../lib/models/category.models";
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/dbConnect";
ConnectDB();
export const GET = async (request: NextRequest) => {
  try {
    const category = await CategoryModel.find({ isPublish: true }).select(
      "name image.image_url slug gitUrl webUrl discription -_id"
    );

    return NextResponse.json({
      msg: "category fetched",
      category,
      total: category.length,
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
