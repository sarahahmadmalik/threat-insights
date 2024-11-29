"use client";

import AdminLayout from "@/components/AdminLayout";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const TicketDetails = () => {
  const { id } = useParams(); // Fetch the dynamic 'id' from the URL

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated ticket data (in real scenarios, fetch this from an API or database)
  const sampleTickets = Array(50)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      title: `Ticket Title ${i + 1}`,
      user: `user${i}@gmail.com`,
      status: i % 2 === 0 ? "Open" : "Closed",
      date: new Date().toLocaleDateString(),
      description: `This is the detailed description of ticket ${i + 1}.`,
      priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
      category: i % 2 === 0 ? "Technical Issue" : "Billing Issue",
    }));

  useEffect(() => {
    if (id) {
      // Simulating data fetch based on ticket ID
      const foundTicket = sampleTickets.find(
        (ticket) => ticket.id === parseInt(id)
      );
      if (foundTicket) {
        setTicket(foundTicket);
      } else {
        toast.error("Ticket not found!");
      }
      setLoading(false);
    }
  }, [id]); // Dependency array: only run effect when `id` changes

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-center mt-10 text-lg text-gray-300">Loading...</p>
      </AdminLayout>
    );
  }

  if (!ticket) {
    return (
      <AdminLayout>
        <p className="text-center mt-10 text-lg text-red-500">
          Ticket not found.
        </p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="p-6 rounded-lg shadow-lg bg-gray-800 text-white">
        <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-4">
            <p>
              <strong>ID:</strong> {ticket.id}
            </p>

            <p>
              <strong>User:</strong> {ticket.user}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-lg ${
                  ticket.status === "Open" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {ticket.status}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              <strong>Date:</strong> {ticket.date}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p>
            <strong>Description:</strong>
          </p>
          <p className="mt-2 bg-gray-700 p-4 rounded-lg">
            {ticket.description}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#2f90b0] hover:bg-[#21718b] text-white px-4 py-2 rounded-lg"
            onClick={() => window.history.back()} // Go back to previous page
          >
            Back to Tickets
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TicketDetails;
