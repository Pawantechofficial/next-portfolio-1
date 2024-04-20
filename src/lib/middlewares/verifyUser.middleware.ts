import { NextRequest } from "next/server";
import { verifyToken } from "../../lib/services/TokenService";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";

export const isAuth = async (request: NextRequest) => {
  const token = await request.cookies.get("auth");
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login first");
  }
  const user = await verifyToken(token.value);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "user not found");
  }
  return user;
};
