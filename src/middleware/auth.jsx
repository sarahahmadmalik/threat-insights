import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';  

export function middleware(req) {
  const { pathname } = req.nextUrl;
  
  if (pathname.startsWith('/api') || pathname.startsWith('/dashboard')) {
    // Get the JWT token from cookies
    const token = req.cookies.get('token');
    
    // If there's no token, the user is not logged in, so deny access
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url)); 
    }

    // Decode the token to check the user's role and other details
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
      // Extract user role from the decoded token
      const userRole = decodedToken.role;

      // Role-based access control: Ensure the user has the correct role for the route
      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 });
      }

      if (pathname.startsWith('/analyst') && userRole !== 'analyst') {
        return new NextResponse('Forbidden', { status: 403 });
      }

      if (pathname.startsWith('/customer') && userRole !== 'customer') {
        return new NextResponse('Forbidden', { status: 403 });
      }

    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url)); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/admin/*', '/analyst/*', '/customer/*', '/api/*'],
};
