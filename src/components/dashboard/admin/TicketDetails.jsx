"use client";

import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const TicketDetails = ({ ticket }) => {
  const router = useRouter();

  if (!ticket) {
    toast.error("Ticket not found!");
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <p>
              <strong>ID:</strong> {ticket._id}
            </p>
            <p>
              <strong>User:</strong> {ticket.userId?.email || "N/A"}
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
              <strong>Date:</strong>{" "}
              {new Date(ticket.dateCreated).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p>
            <strong>Description:</strong>
          </p>
          <p className="mt-2 bg-gray-700 p-4 rounded-lg">{ticket.details}</p>
        </div>
        <div className="mt-6">
          <p>
            <strong>Comments:</strong>
          </p>
          <div className="mt-2 bg-gray-700 p-4 rounded-lg">
            {ticket.comments && ticket.comments.length > 0 ? (
              ticket.comments.map((comment, index) => (
                <p key={index} className="mb-2">
                  <strong>
                    {comment.userId?.name || "Unknown User"} says:
                  </strong>{" "}
                  {comment.comment}
                </p>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#2f90b0] hover:bg-[#21718b] text-white px-4 py-2 rounded-lg"
            onClick={() => router.back()}
          >
            Back to Tickets
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TicketDetails;
