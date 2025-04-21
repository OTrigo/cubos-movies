import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/verifyJWT";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session-token")?.value;

  const pathname = request.nextUrl.pathname;
  const publicRoutes = ["/signIn", "/signUp"];

  if (!token) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
    return NextResponse.next();
  }

  const user = (await verifyJwt(token)) as {verified: boolean, email: string};

  if (!user) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  } else if (
    user &&
    !user.verified &&
    pathname !== `/signIn/${user.email}` &&
    !pathname.includes("/validate")
  ) {
    return NextResponse.redirect(new URL(`/signIn/${user.email}`, request.url));
  } else if (
    user &&
    user.verified &&
    (pathname.includes("/signIn") || pathname.includes("/signUp"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signUp/:path*", "/movies/:path*", "/validate"],
};
