import { NextResponse } from "next/server";
import { fetchDropdowns, createDropdown, updateDropdown } from "@/utils/dropdowns";

// Fetch all dropdowns
export async function GET() {
  try {
    const dropdowns = await fetchDropdowns();

    if (dropdowns.error) {
      return NextResponse.json({ error: dropdowns.error }, { status: 500 });
    }

    return NextResponse.json(dropdowns, { status: 200 });
  } catch (error) {
    console.error("Error in fetching dropdowns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new dropdown
export async function POST(req) {
  try {
    const { title, options } = await req.json();

    if (!title || !options) {
      return NextResponse.json(
        { error: "Title and options are required" },
        { status: 400 }
      );
    }

    const result = await createDropdown(title, options);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Dropdown created successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in creating dropdown:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update an existing dropdown
export async function PUT(req) {
  try {
    const { _id, title, options } = await req.json();

    if (!_id || !title || !options) {
      return NextResponse.json(
        { error: "ID, title, and options are required" },
        { status: 400 }
      );
    }

    const updatedDropdown = await updateDropdown(_id, title, options);

    if (updatedDropdown.error) {
      return NextResponse.json(
        { error: updatedDropdown.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Dropdown updated successfully", data: updatedDropdown },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating dropdown:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
