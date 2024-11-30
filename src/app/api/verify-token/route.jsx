import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token?.value) {
      return new Response(JSON.stringify({ error: "Token is required" }), {
        status: 400,
      });
    }

    const decodedToken = jwt.verify(token?.value, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ decodedToken }), { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
