import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
import { ConnectDB } from "../config/dbConnect";
import { UserModel } from "../models/user.models";

ConnectDB();
export const VerifyAdmin = async (id: string) => {
  const checkExitUser = await UserModel.findById(id);

  if (!checkExitUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "No User Details Found");
  }
  if (checkExitUser.role === "admin") {
    return true;
  } else {
    return false;
  }
};
