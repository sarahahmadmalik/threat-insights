import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const { token } = await req.json();
  const cookieStore = await cookies();
  //   console.log(cookieStore.get("auth_token"));

  let token_value;
  if (!token) {
    token_value = cookieStore.get("auth_token");
  } else {
    token_value = token;
  }

  try {
    const decodedToken = jwt.verify(token_value.value, process.env.JWT_SECRET);
    console.log(decodedToken);
    return new Response(JSON.stringify({ decodedToken }), { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
