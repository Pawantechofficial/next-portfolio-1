import { VerifyAdmin } from "../../../../../lib/middlewares/verifyAdmin.middleware";
import { isAuth } from "../../../../../lib/middlewares/verifyUser.middleware";
import { CategoryModel } from "../../../../../lib/models/category.models";
import { UploadImage } from "../../../../../lib/utils/cloudinary";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);
    const admin = await VerifyAdmin(user);

    if (!admin) {
      throw new ApiError(httpStatus.BAD_REQUEST, "can not access this route");
    }
    const data = await request.formData();
    const image = data.get("image") as unknown as File;
    const category_name = data.get("category_name") as string;
    const discription = data.get("discription") as string;
    const gitUrl = data.get("gitUrl") as string;
    const webUrl = data.get("webUrl") as string;
    if (!image || !category_name || !discription || !gitUrl || !webUrl) {
      throw new ApiError(httpStatus.BAD_REQUEST, "All fields are required");
    }
    const checkExistCategory = await CategoryModel.findOne({
      name: category_name,
    });
    if (checkExistCategory) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Category already Exist");
    }

    const upload_result: any = await UploadImage(image, "category");

    const slug = await slugify(category_name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });

    const category = await CategoryModel.create({
      name: category_name,
      gitUrl: gitUrl,
      webUrl: webUrl,
      discription: discription,
      slug: slug,
      image: {
        image_url: upload_result.secure_url,
        cloudnary_public_id: upload_result.public_id,
      },
    });
    console.log({ category });
    return NextResponse.json({ msg: "category added" });
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
