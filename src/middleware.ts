import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathVariable = request.nextUrl.pathname;
  console.log(pathVariable);
  const publicPath = pathVariable === "/login" || pathVariable === "/register";
  const auth = request.cookies.get("auth") || "";
  if (auth && publicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/:path*",
};
