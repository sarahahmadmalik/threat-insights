import TicketDetails from "@/components/dashboard/admin/TicketDetails";
import fetch from "node-fetch";

export default async function TicketDetailsPage({ params }) {
  const { id } = params; 
  let ticket = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ticketsId/${id}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (!data.error) {
      ticket = data;
    } else {
      console.error("Error fetching ticket:", data.error);
    }
  } catch (error) {
    console.error("Error fetching ticket:", error);
  }

  return <TicketDetails ticket={ticket} />;
}
