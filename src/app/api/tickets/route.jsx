import { fetchTickets } from "@/utils/tickets";
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