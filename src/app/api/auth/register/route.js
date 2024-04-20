import { ConnectDB } from "../../../../lib/config/dbConnect";
import { UserModel } from "../../../../lib/models/user.models";
import { generateToken } from "../../../../lib/services/TokenService";
import { NextResponse } from "next/server";

ConnectDB();

export const POST = async (request) => {
  try {
    const { name, email, password } = await request.json();
    if (
      !email ||
      !name ||
      !password ||
      email === "" ||
      name == "" ||
      password == ""
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        {
          status: 400,
        }
      );
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "User already exist" },
        {
          status: 400,
        }
      );
    }
    const user = await UserModel.create({ email, name, password });
    const token = await generateToken(user);

    const response = NextResponse.json(
      { msg: "User Register Successfully" },
      {
        status: 201,
      }
    );

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
