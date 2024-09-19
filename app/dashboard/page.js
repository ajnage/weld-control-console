"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Component for the dashboard page
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login"); // Redirect to sign-in if not logged in
    }
  }, [status, router]);

  // Render the dashboard only if the user is authenticated
  if (status === "authenticated") {
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>This is your dashboard.</p>
      </div>
    );
  }

  // Optionally render a loading state or message
  return <p>Loading...</p>;
}