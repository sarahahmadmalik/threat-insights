import { NextResponse } from "next/server";
import { toggleTicketStatus } from "@/utils/tickets";
export async function PATCH(req, { params }) {
    const { id } = params;
  
    const result = await toggleTicketStatus(id);
  
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
  
    return NextResponse.json(
      { message: result.message, ticket: result.ticket },
      { status: result.status }
    );
  }