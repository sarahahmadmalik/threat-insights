import db from "@/utils/db";
import User from "@/models/User";
export const fetchUsers = async () => {
  try {
    await db();

    const users = await User.find({
      role: { $in: ["customer", "analyst"] },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Unable to fetch users" };
  }
};

export const deleteUserById = async (id) => {
  try {
    await db();

    const result = await User.deleteOne({ _id: id });

    // Check if a user was actually deleted
    if (result.deletedCount === 0) {
      return { error: `No user found with ID ${id}` };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Unable to delete user. Please try again." };
  }
};

// Function to delete multiple users by their IDs
export const deleteUsersByIds = async (ids) => {
  try {
    await db();
    // Validate input IDs
    if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => !id)) {
      return { error: "Invalid IDs provided for batch deletion" };
    }

    const result = await User.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return { error: "No users found for the provided IDs" };
    }

    return { message: `${result.deletedCount} users deleted successfully.` };
  } catch (error) {
    console.error("Error in batch deletion:", error);
    return { error: "Failed to delete users due to an internal server error" };
  }
};
