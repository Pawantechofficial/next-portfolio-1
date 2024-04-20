import Jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";
import httpStatus from "http-status";
const JWT_AUTH = process.env.TOKEN_AUTH_SECRET;
const JWT_PAYMENT = process.env.TOKEN_PAYMENT_SECRET;

export const generateToken = async (user) => {
  const token = Jwt.sign({ userId: user._id }, JWT_AUTH, {
    expiresIn: "30d",
  });
  return token;
};

export const generatePaymentToken = async (checkoutId) => {
  const token = Jwt.sign({ checkoutId: checkoutId }, JWT_PAYMENT, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = async (token) => {
  try {
    const verify = Jwt.verify(token, JWT_AUTH);
    return verify["userId"];
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, e.message);
  }
};

export const verifyPaymentToken = async (token) => {
  try {
    const verify = Jwt.verify(token, JWT_PAYMENT);
    return verify["checkoutId"];
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, e.message);
  }
};
