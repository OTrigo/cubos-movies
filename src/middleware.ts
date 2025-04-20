import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/verifyJWT";
import { User } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session-token")?.value;

  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/signIn", "/signIn/validate"];

  if (!token) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
    return NextResponse.next();
  }

  const user = (await verifyJWT(token)) as User;

  if (!user) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (user && !user.verified && pathname !== "/signIn/validate") {
    return NextResponse.redirect(new URL("/signIn/validate", request.url));
  }

  if (user && user.verified && pathname === "/signIn/validate") {
    return NextResponse.redirect(new URL("/movies", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/movies/:path*", "/signIn/validate"],
};
