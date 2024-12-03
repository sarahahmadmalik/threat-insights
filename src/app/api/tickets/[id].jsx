import { fetchTicketById } from "@/utils/tickets";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  const { id } = params;
  console.log(id);

  try {
    const ticket = await fetchTicketById(id);

    if (!ticket) {
      console.log(ticket);
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return ticket;
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
