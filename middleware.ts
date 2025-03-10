import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/account"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => {
    return path.startsWith(route);
  });

  const cookieStore = await cookies();
  const authToken = await cookieStore?.get(process.env.JWT_SECRET_KEY as string)
    ?.value;

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
}
