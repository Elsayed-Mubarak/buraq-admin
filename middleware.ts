import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequest) {
    console.log("Middleware executing...");

    const pathName = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });

    const protectedRoutes = ["/settings"];
    const isProtectedRoute = protectedRoutes.some((route) => pathName.startsWith(route));
    const isAuthRoute = pathName.startsWith("/auth/login");

    // 🔹 Prevent redirect loop: If already on /auth/login, don't redirect again
    if (!isAuth && isProtectedRoute) {
      if (!isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    // 🔹 Ensure middleware always returns a response
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/settings", "/auth/login"], // Apply middleware to login page too
};
