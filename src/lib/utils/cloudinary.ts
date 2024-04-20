import { v2 as cloudinary } from "cloudinary";
import { resolve } from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//upload image------------

export const UploadImage = async (file: File, folder: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const bytesBuffer = Buffer.from(arrayBuffer);

  return new Promise(async (resolve: any, reject: any) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            reject(err.message);
          }
          resolve(result);
        }
      )
      .end(bytesBuffer);
  });
};

//Delete image------------

export const DeleteImage = async (public_id: string) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
