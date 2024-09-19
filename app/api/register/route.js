import { NextResponse } from "next/server";
import { hashPassword, findUserByEmail } from "../../../lib/auth/auth";
import prisma from "../../../lib/prisma/prisma";

// Handle POST requests for user registration
export async function POST(req) {
  const { email, password, username } = await req.json();

  // Check if the user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 }
    );
  }

  // Hash the password securely
  const hashedPassword = await hashPassword(password);

  try {
    // Create a new user in the database
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isAdmin: false, // Set default admin status
      },
    });

    // Respond with success message
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Respond with error message
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}