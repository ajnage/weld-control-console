// prisma/seed.js

const { PrismaClient } = require("@prisma/client"); // Ensure the path points to your Prisma client instance
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  try {
    // Define the initial admin user data
    const adminUser = {
      username: "admin", // Change to your desired admin username
      email: "admin@example.com", // Change to your desired admin email
      password: "securepassword", // Change to your desired password (will be hashed)
      isAdmin: true, // Set to true to create an admin user
    };

    // Hash the password using bcrypt with salting
    const saltRounds = 10; // Adjust the number of salt rounds based on security/performance needs
    const hashedPassword = await bcrypt.hash(adminUser.password, saltRounds);

    // Check if an admin user already exists to avoid duplicate entries
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: adminUser.email,
        username: adminUser.username,
      },
    });

    // If the admin does not exist, create it
    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          username: adminUser.username,
          email: adminUser.email,
          password: hashedPassword,
          isAdmin: adminUser.isAdmin,
        },
      });
      console.log("Admin user seeded successfully.");
    } else {
      console.log("Admin user already exists. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    // Disconnect the Prisma client to prevent hanging processes
    await prisma.$disconnect();
  }
}

// Execute the main function
main().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
