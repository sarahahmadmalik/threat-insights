import LayoutClient from "@/components/dashboard/LayoutClient";
import fetch from "node-fetch";
import { cookies } from "next/headers";

export default async function Layout({ children }) {
  let username = null;
  let role = null;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");

  try {
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
    if (!data.error) {
      const fullName = data.decodedToken.name;
      username = fullName.includes(" ") ? fullName.split(" ")[0] : fullName;
      role = data.decodedToken.role;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }

  return <LayoutClient username={username} role={role}>{children}</LayoutClient>;
}
