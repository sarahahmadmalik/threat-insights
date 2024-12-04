"use client";

import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { useState, useEffect } from "react";
import Image from "next/image";
import DeleteTicketPopup from "@/components/popups/DeleteTicketPopup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Tickets = ({ allTickets }) => {
  const router = useRouter();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tickets, setTickets] = useState(allTickets);

  const [selectedTicketIds, setSelectedTicketIds] = useState([]);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

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

  useEffect(() => {
    const updatedData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        if (!data.error) {
          setTickets(data);
          return data;
        } else {
          console.error("Error fetching users:", data.error);
          return [];
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        return [];
      }
    };

    if (isDataUpdated) {
      updatedData();
      setIsDataUpdated(false);
    }
  }, [isDataUpdated]);

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
      setSelectedTicketIds(tickets.map((ticket) => ticket._id));
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

  const confirmDeleteSelection = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedTicketIds }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSelectedTicketIds([]);
        setIsDataUpdated(true)
        setIsDeleteConfirmationVisible(false);
        setCurrentPageIndex(1); // Reset to the first page after deletion
        toast.success(
          result.message || "Selected tickets deleted successfully!"
        );
      } else {
        const errorResult = await response.json();
        toast.error(errorResult.error || "Failed to delete tickets.");
      }
    } catch (error) {
      console.error("Error deleting tickets:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const cancelDeleteSelection = () => {
    setIsDeleteConfirmationVisible(false);
  };

  console.log(allTickets)

  const handleStatusChange = async (id) => {
    const ticketToUpdate = tickets.find((ticket) => ticket._id === id);
    const newStatus = ticketToUpdate.status === "Open" ? "Closed" : "Open"; // Toggle between "Open" and "Closed"
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/${id}`,
        {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
  
      if (response.ok) {
        const updatedTicket = await response.json();
        // setTickets((prevTickets) =>
        //   prevTickets.map((ticket) =>
        //     ticket._id === id
        //       ? { ...ticket, status: updatedTicket.status } // Update the status in the state
        //       : ticket
        //   )
        // );
        setIsDataUpdated(true)
        toast.success("Ticket status updated successfully!");
      } else {
        const errorResult = await response.json();
        toast.error(errorResult.error || "Failed to update ticket status.");
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
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
          {/* Display Selected Rows Count */}
          <div className="mb-4 text-white">
            {selectedTicketIds.length}{" "}
            {selectedTicketIds.length === 1 ? "row" : "rows"} selected
          </div>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full min-w-[700px] text-left border-separate border-spacing-y-2">
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
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="px-5 py-3 font-[400] text-center th-class">
                    No
                  </th>
                  <th className="px-5 py-3 font-[400]  th-class">User</th>
                  <th className="px-5 py-3 font-[400]  th-class text-center">
                    Status
                  </th>
                  <th className="px-5 py-3 font-[400]  th-class text-center">
                    Date
                  </th>
                  <th className="px-5 py-3 font-[400]  th-class text-center">
                    Details
                  </th>
                  <th className="th-class font-[400]  text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="flex flex-col items-center rounded-[10px] justify-center h-[400px] bg-[#2323238A]">
                        <Image
                          src="/icons/no-data.svg"
                          alt="No Data"
                          width={100}
                          height={100}
                        />
                        <p className="text-gray-500 mt-4 text-lg">
                          No tickets available
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentPageTickets.map((ticket, idx) => (
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
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="td-class text-center">{idx + 1}</td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {tickets.length > 1 && (
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
          )}
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
