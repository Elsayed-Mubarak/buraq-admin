import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname: string = request.nextUrl.pathname;
  const protectedRoutes: string[] = ['/dashboard'];
  const isProtectedRoute: boolean = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const authRoute: string = '/';

  // Get the token from cookies using NextRequest
  const token: string | undefined = request.cookies.get('auth_token')?.value; 
  const isAuthenticated: boolean = !!token;

  


  // Redirect logic
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(authRoute, request.url));
  }

  if (isAuthenticated && pathname === authRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};