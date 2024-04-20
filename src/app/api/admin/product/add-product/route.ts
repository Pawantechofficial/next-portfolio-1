import { ProductModel } from "../../../../../lib/models/product.models";
import { UploadImage } from "../../../../../lib/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const image = formData.get("image") as unknown as File;
    const category_name = formData.get("category_name") as string;
    const productName = formData.get("productName") as string;
    const rating = formData.get("rating") as string;
    const price = formData.get("price") as string;
    const discount = formData.get("discount") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const longDescription = formData.get("longDescription") as string;

    const upload_result: any = await UploadImage(image, "product");
    const slug = await slugify(productName, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });

    const product = await ProductModel.create({
      name: productName,
      slug: slug,
      image: {
        image_url: upload_result.secure_url,
        cloudnary_public_id: upload_result.public_id,
      },
      category: category_name,
      rating: rating,
      price: price,
      short_disc: shortDescription,
      long_disc: longDescription,
      discount: discount,
    });
    console.log({ product });
    return NextResponse.json({ msg: "Product added" });
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
