"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import Image from "next/image";
import DeleteTicketPopup from "@/components/popups/DeleteTicketPopup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Tickets = () => {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tickets, setTickets] = useState(
    Array(50)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        title: `Ticket Title ${i + 1}`,
        user: `user${i}@gmail.com`,
        status: i % 2 === 0 ? "Open" : "Closed",
        date: new Date().toLocaleDateString(),
      }))
  );

  const [selectedTicketIds, setSelectedTicketIds] = useState([]);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const currentPageTickets = tickets.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageIndex(page);
    }
  };

  const handleSelectAllRows = (isChecked) => {
    if (isChecked) {
      const allCurrentPageTicketIds = currentPageTickets.map(
        (ticket) => ticket.id
      );
      setSelectedTicketIds(allCurrentPageTicketIds);
    } else {
      setSelectedTicketIds([]);
    }
  };

  const handleRowSelection = (id) => {
    setSelectedTicketIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleDeleteSelectedTickets = () => {
    if (selectedTicketIds.length > 0) {
      setIsDeleteConfirmationVisible(true);
    } else {
      toast.error("Please select at least one ticket to delete!");
    }
  };

  const confirmDeleteSelection = () => {
    const remainingTickets = tickets.filter(
      (ticket) => !selectedTicketIds.includes(ticket.id)
    );
    setTickets(remainingTickets);
    setSelectedTicketIds([]);
    setIsDeleteConfirmationVisible(false);
    toast.success("Selected tickets deleted successfully!");
  };

  const cancelDeleteSelection = () => {
    setIsDeleteConfirmationVisible(false);
  };

  const handleStatusChange = (id) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: ticket.status === "Open" ? "Closed" : "Open" }
          : ticket
      )
    );
    toast.success("Ticket status updated!");
  };

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="shadow rounded-lg py-6">
        <div className="p-4 flex w-full justify-end">
          <button
            className={`bg-red-500 rounded-full flex items-center justify-center w-[45px] h-[45px] text-white border-2 border-white px-3 py-1 ${
              selectedTicketIds.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleDeleteSelectedTickets}
            disabled={selectedTicketIds.length === 0}
          >
            <Image src="/icons/del.svg" alt="Delete" width={35} height={35} />
          </button>
        </div>
        <div
          className="p-6 rounded-[15px]"
          style={{ backgroundColor: "#2F90B026" }}
        >
          <div className="overflow-x-scroll  rounded-lg shadow-md">
            <table className="w-full  text-left border-separate border-spacing-y-2">
              <thead
                className="shadow-md border-none"
                style={{ backgroundColor: "#2F90B04D" }}
              >
                <tr>
                  <th className="th-class text-center">
                    <input
                      type="checkbox"
                      checked={
                        currentPageTickets.length > 0 &&
                        currentPageTickets.every((ticket) =>
                          selectedTicketIds.includes(ticket.id)
                        )
                      }
                      onChange={(e) => handleSelectAllRows(e.target.checked)}
                    />
                  </th>
                  <th className="px-5 py-3 text-center">ID</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Date</th>
                  <th className="px-5 py-3 text-center">Details</th>
                  <th className="th-class text-center ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className={`hover:bg-gray-600 text-[#FFFFFFB2] ${
                      selectedTicketIds.includes(ticket.id)
                        ? "bg-gray-600"
                        : "bg-[#2323238A]"
                    }`}
                  >
                    <td className="td-class text-center">
                      <input
                        type="checkbox"
                        checked={selectedTicketIds.includes(ticket.id)}
                        onChange={() => handleRowSelection(ticket.id)}
                      />
                    </td>
                    <td className="td-class text-center">{ticket.id}</td>
                    <td className="td-class">{ticket.title}</td>
                    <td className="td-class">{ticket.user}</td>
                    <td className="td-class text-center">
                      <span
                        className={`px-2 py-1 rounded-lg text-white ${
                          ticket.status === "Open"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="td-class">{ticket.date}</td>
                    <td className="td-class text-center">
                      <button
                        className="text-blue-500 underline"
                        onClick={() =>
                          router.push(`/admin/support-tickets/${ticket.id}`)
                        }
                      >
                        View Details
                      </button>
                    </td>
                    <td className="td-class text-center">
                      <button
                        className="ml-4 text-yellow-500"
                        onClick={() => handleStatusChange(ticket.id)}
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isDeleteConfirmationVisible && (
          <DeleteTicketPopup
            selectedTickets={selectedTicketIds}
            onDelete={confirmDeleteSelection}
            onClose={cancelDeleteSelection}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Tickets;
