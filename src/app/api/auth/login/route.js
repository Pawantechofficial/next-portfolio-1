import { ConnectDB } from "../../../../lib/config/dbConnect";
import { UserModel } from "../../../../lib/models/user.models";
import { generateToken } from "../../../../lib/services/TokenService";
import { NextResponse } from "next/server";

ConnectDB();

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password || email === "" || password == "") {
      return NextResponse.json(
        { error: "All fields are required" },
        {
          status: 400,
        }
      );
    }
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json(
        { error: "User not found" },
        {
          status: 400,
        }
      );
    }
    //password check
    const PsswordMatch = existUser.ComparePassword(password);
    if (!PsswordMatch) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        {
          status: 400,
        }
      );
    }

    const token = await generateToken(existUser);

    const response = NextResponse.json(
      { msg: "User Login Successfully" },
      {
        status: 200,
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
