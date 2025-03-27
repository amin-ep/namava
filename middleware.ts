import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authProtectedRoutes = ["/account", "/playlists", "/plans"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = authProtectedRoutes.some((route) => {
    return path.startsWith(route);
  });

  const cookieStore = await cookies();
  const authToken = await cookieStore?.get(process.env.JWT_SECRET_KEY as string)
    ?.value;

  const subscriptionId = await cookieStore.get(
    process.env.SUBSCRIPTION_KEY as string,
  )?.value;

  if (subscriptionId && path.startsWith("/plans")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!authToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
}
