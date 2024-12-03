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
