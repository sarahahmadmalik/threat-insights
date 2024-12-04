import { fetchTickets, deleteTicketById, deleteTicketsByIds } from "@/utils/tickets";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const tickets = await fetchTickets(); 
  
      if (tickets.error) {
        return NextResponse.json({ error: tickets.error }, { status: 500 });
      }
  
      return NextResponse.json(tickets, { status: 200 }); 
    } catch (error) {
      console.error("Error in fetching tickets:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

export async function DELETE(request) {
  try {
    // Parse the JSON body of the request
    const { ids } = await request.json();
    console.log(ids)

    if (!ids) {
      return NextResponse.json(
        { error: "Ticket ID or array of IDs is required" },
        { status: 400 }
      );
    }

    // Check if the ID is an array or a single ID
    if (Array.isArray(ids)) {
      // Validate the array to ensure no empty elements
      if (ids.length === 0 || ids.some((item) => !item)) {
        return NextResponse.json(
          { error: "Array of IDs must not contain empty elements" },
          { status: 400 }
        );
      }

      // Perform batch deletion of tickets
      const result = await deleteTicketsByIds(ids);

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {

      const result = await deleteTicketById(ids);

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json(
        { message: "Ticket has been deleted successfully." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error in deleting ticket:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




