import { ConnectDB } from "../../../../lib/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
ConnectDB();

export const POST = async (request: NextRequest) => {
  const response = NextResponse.json(
    { msg: "User logout successfully" },
    {
      status: 200,
    }
  );
  response.cookies.delete("auth");
  return response;
};
