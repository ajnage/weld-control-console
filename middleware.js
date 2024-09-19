import { authMiddleware } from "./lib/middleware/authMiddleware";
import { otherMiddleware } from "./lib/middleware/otherMiddleware";
import { NextResponse } from "next/server";

// Main middleware function to manage all checks
export async function middleware(req) {
  // Check for authentication and admin access
  const authResponse = await authMiddleware(req);
  if (authResponse) return authResponse;

  // Apply other middleware logic as needed
  const otherResponse = await otherMiddleware(req);
  if (otherResponse) return otherResponse;

  // Proceed if all middleware checks pass
  return NextResponse.next();
}

// Define which routes are protected by the middleware
export const config = {
  matcher: ["/auth/register"], // Protect the register route
};