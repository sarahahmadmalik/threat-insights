import { NextResponse } from "next/server";
import db from "@/utils/db";
import { createUser } from "@/utils/signup";

export async function POST(req) {
  try {
    await db();

    const { username, email, password, phone, name } = await req.json();

    const result = await createUser({
      username,
      email,
      password,
      phone,
      name,
    });

    // console.log(result);

    if (result.error) {
      console.log(result.error)
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 201 });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
