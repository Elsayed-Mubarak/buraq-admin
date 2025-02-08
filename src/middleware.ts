import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";




export default withAuth(
  async function middleware(request) {

  
    const  pathname  = request.nextUrl.pathname;
    const isAuth = await getToken({req : request})
    const protectedRoute = ["/dashboard"]
    const isProtectedRote = protectedRoute.some((route)=> pathname.startsWith(route))
    const isAuthRoute = '/'

    if (!isAuth && isProtectedRote) {

      return NextResponse.redirect(new URL("/", request.url));
    }
    if(isAuth && pathname === isAuthRoute ) {

      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Allow only authenticated users
    },
  }
);


export const config = {
  matcher: [ "/dashboard/:path*"], // Apply to settings routes
};