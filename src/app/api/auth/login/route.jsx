import { NextResponse } from "next/server";
import db from "@/utils/db";
import { loginUser } from "@/utils/login";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await db();

    const { emailOrUsername, password } = await req.json();

    const result = await loginUser({
      emailOrUsername,
      password,
    });

    if (result.error) {
      console.log(result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const cookie = serialize("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60, // 5 days in seconds
      path: "/",
    });

    const response = NextResponse.json(
      { success: result.success, message: result.message, user: result.user },
      { status: 200 }
    );

    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
