import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function authMiddleware(req) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

// Redirect unauthenticated users to sign-in
if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Redirect non-admin users to the homepage
  if (!token.isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request if authenticated and admin
  return null;
}