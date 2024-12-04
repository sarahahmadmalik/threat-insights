import Tickets from "@/models/Tickets";
import db from "./db";
export async function fetchTickets() {
  try {
    await db();
    const tickets = await Tickets.find()
      .populate("userId", "name email")
      .populate("comments.userId", "name email");

    console.log(tickets);
    return tickets;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return { error };
  }
}

export const fetchTicketById = async (ticketId) => {
  try {
    await db();

    // Find the ticket and populate user details in comments
    const ticket = await Tickets.findById(ticketId)
      .populate("userId", "name email")
      .populate("comments.userId", "name email");

    return ticket;
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    throw new Error("Failed to fetch ticket.");
  }
};


export async function toggleTicketStatus(ticketId) {
  await db(); // Make sure you're connected to the database

  try {
    // Find the ticket by ID
    const ticket = await Tickets.findById(ticketId);

    // If no ticket is found, return an error
    if (!ticket) {
      return { error: "Ticket not found", status: 404 };
    }

    // Toggle the status between 'Open' and 'Closed'
    ticket.status = ticket.status === "Open" ? "Closed" : "Open";

    // Save the ticket with the updated status
    await ticket.save();

    // Return success message and updated ticket
    return {
      message: "Ticket status updated successfully!",
      ticket,
      status: 200,
    };
  } catch (error) {
    console.error("Error updating ticket status:", error);
    
    // Return a server error in case of any issues during the process
    return {
      error: "Internal server error",
      status: 500,
    };
  }
}



// Function to delete a single ticket by its ID
export const deleteTicketById = async (id) => {
  try {
    await db();

    const result = await Tickets.deleteOne({ _id: id });

    // Check if a ticket was actually deleted
    if (result.deletedCount === 0) {
      return { error: `No ticket found with ID ${id}` };
    }

    return { message: `Ticket with ID ${id} deleted successfully.` };
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return { error: "Unable to delete ticket. Please try again." };
  }
};

// Function to delete multiple tickets by their IDs
export const deleteTicketsByIds = async (ids) => {
  try {
    await db();

    // Validate input IDs
    if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => !id)) {
      return { error: "Invalid IDs provided for batch deletion" };
    }

    const result = await Tickets.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return { error: "No tickets found for the provided IDs" };
    }

    return { message: `${result.deletedCount} tickets deleted successfully.` };
  } catch (error) {
    console.error("Error in batch deletion:", error);
    return { error: "Failed to delete tickets due to an internal server error" };
  }
};

