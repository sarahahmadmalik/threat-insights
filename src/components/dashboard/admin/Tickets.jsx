"use client";

import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { useState } from "react";
import Image from "next/image";
import DeleteTicketPopup from "@/components/popups/DeleteTicketPopup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Tickets = ({ allTickets }) => {
  console.log(allTickets);
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tickets, setTickets] = useState(allTickets);

  const [selectedTicketIds, setSelectedTicketIds] = useState([]);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const currentPageTickets = tickets.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  const convertDate = (isoDate) => {
    const date = new Date(isoDate);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageIndex(page);
    }
  };

  const handleBack = () => {
    setCurrentPageIndex(1);
  };

  const handleNext = () => {
    setCurrentPageIndex(totalPages);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(1, currentPageIndex - 2);
    let end = Math.min(totalPages, currentPageIndex + 2);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleSelectAllRows = (isChecked) => {
    if (isChecked) {
      const allTicketIds = tickets.map((ticket) => ticket._id); // Select all ticket IDs from the dataset
      setSelectedTicketIds(allTicketIds);
    } else {
      setSelectedTicketIds([]); // Deselect all rows
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
      (ticket) => !selectedTicketIds.includes(ticket._id)
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
        ticket._id === id
          ? { ...ticket, status: ticket.status === "Open" ? "Closed" : "Open" }
          : ticket
      )
    );
    toast.success("Ticket status updated!");
  };

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="shadow rounded-lg py-6 ">
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
          <div className="mb-4 text-white">
            {selectedTicketIds.length}{" "}
            {selectedTicketIds.length === 1 ? "row" : "rows"} selected
          </div>
          <div className="overflow-x-auto  rounded-lg shadow-md">
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
                        selectedTicketIds.length === tickets.length &&
                        tickets.length > 0
                      }
                      onChange={(e) => handleSelectAllRows(e.target.checked)}
                    />
                  </th>
                  <th className="px-5 py-3 text-center">ID</th>
                  {/* <th className="px-5 py-3">Title</th> */}
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Date</th>
                  <th className="px-5 py-3 text-center">Details</th>
                  <th className="th-class text-center ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageTickets.map((ticket, idx) => (
                  <tr
                    key={ticket._id}
                    className={`hover:bg-gray-600 text-[#FFFFFFB2] ${
                      selectedTicketIds.includes(ticket._id)
                        ? "bg-gray-600"
                        : "bg-[#2323238A]"
                    }`}
                  >
                    <td className="td-class text-center">
                      <input
                        type="checkbox"
                        checked={selectedTicketIds.includes(ticket._id)}
                        onChange={() => handleRowSelection(ticket._id)}
                      />
                    </td>
                    <td className="td-class text-center">{idx + 1}</td>
                    {/* <td className="td-class">{ticket.title}</td> */}
                    <td className="td-class">{ticket.userId.email}</td>
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
                    <td className="td-class">
                      {convertDate(ticket.dateCreated)}
                    </td>
                    <td className="td-class text-center">
                      <button
                        className="text-blue-500 underline underline-offset-4"
                        onClick={() =>
                          router.push(`/admin/support-tickets/${ticket._id}`)
                        }
                      >
                        View Details
                      </button>
                    </td>
                    <td className="td-class text-center">
                      <button
                        className="ml-4 text-yellow-500"
                        onClick={() => handleStatusChange(ticket._id)}
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="p-4 flex justify-end items-center space-x-2">
            <button className="mx-3" onClick={handleBack}>
              <Image src={"/back.svg"} height={10} width={10} alt={"icon"} />
            </button>
            {currentPageIndex > 3 && <span className="px-4 py-2">...</span>}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center w-[20px] h-[20px] rounded-full ${
                  currentPageIndex === page ? "bg-[#2F90B0] text-white" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            {currentPageIndex < totalPages - 2 && (
              <span className="px-4 py-2">...</span>
            )}
            <button className="mx-3" onClick={handleNext}>
              <Image
                src={"/icons/next.svg"}
                height={10}
                width={10}
                alt={"icon"}
              />
            </button>
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
