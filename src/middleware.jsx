import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("auth_token");
  console.log(token);

  // Public routes (accessible to all)
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password")
  ) {
    if (token) {
      // Call the verify-token API route to verify the token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-token`,
        {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.decodedToken) {
        const decodedToken = data.decodedToken;
        // Redirect logged-in users based on their role
        if (decodedToken.role === "customer") {
          return NextResponse.redirect(new URL("/customer/home", req.url));
        } else if (decodedToken.role === "admin") {
          return NextResponse.redirect(new URL("/admin/users", req.url));
        } else if (decodedToken.role === "analyst") {
          return NextResponse.redirect(new URL("/analyst/home", req.url));
        }
      }
    }
    return NextResponse.next();
  }

  // Protected routes (require authentication)
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/customer") ||
    pathname.startsWith("/analyst")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-token`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (!data.decodedToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const decodedToken = data.decodedToken;

    // Role-based access control
    if (pathname.startsWith("/admin") && decodedToken.role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (pathname.startsWith("/analyst") && decodedToken.role !== "analyst") {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (pathname.startsWith("/customer") && decodedToken.role !== "customer") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/analyst/:path*",
    "/customer/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/api/:path*",
  ],
};
