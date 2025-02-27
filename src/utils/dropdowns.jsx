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

// Function to update a dropdown by its ID
export const updateDropdown = async (_id, title, options) => {
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
  
      // Find and update the dropdown by ID
      const updatedDropdown = await Dropdowns.findByIdAndUpdate(
        _id,
        { title, options },
        { new: true }
      );
  
      if (!updatedDropdown) {
        throw new Error("Dropdown not found.");
      }
  
      return updatedDropdown;
    } catch (error) {
      console.error("Error updating dropdown:", error.message);
      throw new Error(error.message || "Error updating dropdown");
    }
  };


// Function to delete a dropdown by its ID
export const deleteDropdown = async (_id) => {
    await db();
  
    try {
      // Check if the ID is valid
      if (!_id) {
        throw new Error("Dropdown ID is required.");
      }
  
      const deletedDropdown = await Dropdowns.findByIdAndDelete(_id);
  
      if (!deletedDropdown) {
        throw new Error("Dropdown not found.");
      }
  
      return deletedDropdown;
    } catch (error) {
      console.error("Error deleting dropdown:", error.message);
      throw new Error(error.message || "Error deleting dropdown");
    }
  };
  

  