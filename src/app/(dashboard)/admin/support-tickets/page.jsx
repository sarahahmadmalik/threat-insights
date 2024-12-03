import Tickets from "@/components/dashboard/admin/Tickets";
import fetch from "node-fetch"

export default async function TicketsPage() {
  let tickets = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data)

    if (!data.error) {
      tickets = data;
    } else {
      console.error("Error fetching tickets:", data.error);
      tickets = [];
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    tickets = [];
  }

  return (
    <>
      <Tickets allTickets={tickets || []} /> 
    </>
  );
}
