import db from "./db";
import Dropdowns from "@/models/Dropdowns";

export const createDropdown = async (title, options) => {
  await db();

  try {
    // Validate title
    if (!title) {
      throw new Error("Title is required.");
    }

    if (typeof title !== "string") {
      throw new Error("Title must be a string.");
    }

    // Validate options
    if (!options || !Array.isArray(options)) {
      throw new Error("Options must be an array.");
    }

    if (options.length === 0) {
      throw new Error("The options array must have at least one item.");
    }

    // Validate each option
    options.forEach((option, index) => {
      if (typeof option !== "string" || option.trim().length === 0) {
        throw new Error(`Option at index ${index} must be a non-empty string.`);
      }
    });

    const newDropdown = new Dropdowns({
      title,
      options,
    });

    await newDropdown.save();

    return newDropdown;
  } catch (error) {
    console.error("Error creating dropdown:", error.message);
    throw new Error(error.message || "Error creating dropdown");
  }
};

// Function to fetch all dropdowns from the database
export const fetchDropdowns = async () => {
  await db();

  try {
    // Find all dropdowns in the collection
    const dropdowns = await Dropdowns.find();

    // Return the fetched dropdowns
    return dropdowns;
  } catch (error) {
    console.error("Error fetching dropdowns:", error);
    return { error };
  }
};
