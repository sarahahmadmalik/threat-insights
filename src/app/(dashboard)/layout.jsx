import LayoutClient from "@/components/LayoutClient";
import fetch from "node-fetch";
import { cookies } from "next/headers";

export default async function Layout({ children }) {
  let username = null;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  // console.log(token)

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
      username = data.decodedToken.username;
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }

  return <LayoutClient username={username}>{children}</LayoutClient>;
}
