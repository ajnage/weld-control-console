import bcrypt from "bcryptjs";
import prisma from "../prisma/prisma";

// Function to hash passwords securely before storing them in the database
export async function hashPassword(password) {
  // Define the number of salt rounds (higher means more secure but slower)
  const saltRounds = 10;

  // Hash the given password with the specified salt rounds and return the hashed password
  return await bcrypt.hash(password, saltRounds);
}

// Function to verify if a given password matches the stored hashed password
export async function verifyPassword(password, hashedPassword) {
  // Compare the plaintext password with the stored hash to check if they match
  return await bcrypt.compare(password, hashedPassword);
}

// Function to find a user by their email address in the database
export async function findUserByEmail(email) {
  // Use Prisma to search for a user with the specified email
  // The `findUnique` method searches for a unique record where the email matches
  return await prisma.user.findUnique({ where: { email } });
}
