import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword, findUserByEmail } from "@/lib/auth/auth";

// Configure NextAuth with credentials provider
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await findUserByEmail(credentials.email);

        if (
          user &&
          (await verifyPassword(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          };
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard"; // Redirect to the dashboard after login
    },
  },
  pages: {
    signIn: "/auth/login", // Ensure this matches your custom login page path
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Correct named exports for NextAuth handlers
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
