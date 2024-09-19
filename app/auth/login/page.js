"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle the form submission for logging in
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Attempt to sign in using NextAuth credentials provider
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // Check for errors and handle redirects
    if (result.error) {
      setError("Invalid email or password"); // Customize the error message
    } else {
      // Redirect to the dashboard upon successful login
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-blue-500 text-white p-6">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}