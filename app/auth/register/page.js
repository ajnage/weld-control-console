"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { middleware } from "@/middleware";

// Component for the registration page
export default function Register() {
  const { data: session, status } = useSession(); // Access session data and authentication status
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" }); // Form data state
  const [error, setError] = useState(""); // Error state

// middleware(session)
// Handle access control based on session status
//   useEffect(() => {
//     if (status === "authenticated" && !session.user.isAdmin) {
//       router.push("/"); // Redirect non-admins to home
//     }
//     if (status === "unauthenticated") {
//       router.push("/auth/login"); // Redirect unauthenticated users to sign-in
//     }
//   }, [session, status, router]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to register a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract username from email
    const username = formData.email.split("@")[0];

    try {
      // Send registration request to the API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, username }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      // After successful registration, redirect to the sign-in page
      alert("User registered successfully! Redirecting to login...");
      router.push("/auth/login");
    } catch (error) {
      setError(error.message);
    }
  };

  // Render the registration form
  return (
    <div>
      <h2>Register User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}