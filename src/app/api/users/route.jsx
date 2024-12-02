import { NextResponse } from "next/server";
import { fetchUsers, deleteUserById, deleteUsersByIds, updateUserById } from "@/utils/users";
import { createUserWithRole } from "@/utils/signup";

export async function GET() {
  try {
    const users = await fetchUsers();

    if (users.error) {
      return NextResponse.json({ error: users.error }, { status: 500 });
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error in fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a user by ID or batch delete by array of IDs
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID or array of IDs is required" },
        { status: 400 }
      );
    }

    // Check if the ID is an array or a single ID
    if (Array.isArray(id)) {
      // Validate the array to ensure no empty elements
      if (id.length === 0 || id.some((item) => !item)) {
        return NextResponse.json(
          { error: "Array of IDs must not contain empty elements" },
          { status: 400 }
        );
      }

      // Perform batch deletion
      const result = await deleteUsersByIds(id);

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      // Perform single deletion
      console.log("delete user");
      const result = await deleteUserById(id);

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json(
        { message: `User has been deleted successfully.` },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { username, email, password, phone, name, role } = await req.json();

    const result = await createUserWithRole({
      username,
      email,
      password,
      phone,
      name,
      role,
    });

    // console.log(result);

    if (result.error) {
      console.log(result.error);
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

// Update user data by ID
export async function PUT(request) {
  try {
    const { id, username, email, phone, name, role } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate the data
    if (!username && !email && !phone && !name && !role) {
      return NextResponse.json(
        {
          error:
            "At least one field (username, email, phone, name, role) is required for updating",
        },
        { status: 400 }
      );
    }

    const result = await updateUserById(id, {
      username,
      email,
      phone,
      name,
      role,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(
      { message: `User has been updated successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
