"use client";

import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { useState } from "react";
import Image from "next/image";
import AddAlertPopup from "@/components/popups/AddAlertPopup";
import EditAlertPopup from "@/components/popups/EditAlertPopup";
import DeleteAlertPopup from "@/components/popups/DeleteAlertPopup";
import toast, { Toaster } from "react-hot-toast";

const Alerts = ({ alerts }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [alertUsers, setAlertUsers] = useState(alerts);

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [alertToEdit, setAlertToEdit] = useState(null);
  const [addAlertPopup, setAddAlertPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedAlertIds, setSelectedAlertIds] = useState([]);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);

  const totalPages = Math.ceil(alertUsers.length / itemsPerPage);
  const currentPageUsers = alertUsers.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageIndex(page);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedAlertIds(isChecked ? alertUsers.map((user) => user._id) : []);
  };

  const handleRowSelection = (id) => {
    setSelectedAlertIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleBack = () => {
    setCurrentPage(1);
  };

  const handleNext = () => {
    setCurrentPage(pages);
  };

  const handleOpenAddAlertPopup = () => {
    setAddAlertPopup(true);
  };

  const handleCloseAddAlertPopup = () => {
    setAddAlertPopup(false);
  };

  const handleOpenEditUserPopup = () => {
    const selectedAlerts = alertUsers.filter((user) =>
      selectedAlertIds.includes(user._id)
    );

    if (selectedAlerts.length === 1) {
      setAlertToEdit(selectedAlerts[0]);
      setIsEditVisible(true);
    } else {
      toast.error("Please select only one row to edit!");
    }
  };

  const handleCloseEditAlertPopup = () => {
    setIsEditVisible(false);
    setAlertToEdit(null);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleSaveAlertEdits = (updatedUser) => {
    setAlertUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? { ...user, ...updatedUser } : user
      )
    );
    toast.success("User details updated successfully!");
    handleCloseEditAlertPopup();
  };

  const handleDeleteSelectedAlerts = () => {
    if (selectedAlertIds.length !== 0) {
      setIsDeleteConfirmationVisible(true);
    } else {
      toast.error("Please select only one row to delete!");
    }
  };

  const confirmDeleteSelection = () => {
    const remainingUsers = alertUsers.filter(
      (user) => !selectedAlertIds.includes(user._id)
    );
    setAlertUsers(remainingUsers);
    setSelectedAlertIds([]);
    setIsDeleteConfirmationVisible(false);
    toast.success("Selected user deleted successfully!");
  };

  const cancelDeleteSelection = () => {
    setIsDeleteConfirmationVisible(false);
  };

  const selectedAlertId = selectedAlertIds[0];

  console.log(alerts);

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      {/* Main Table and Controls */}
      <div className="shadow rounded-lg py-6">
        {/* Add, Edit, Delete Buttons */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex justify-end w-full space-x-2">
            {/* <button
              onClick={handleOpenAddAlertPopup}
              className="bg-[#8087C11F] flex items-center justify-center text-white px-3 py-1 w-[45px] h-[45px] border-2 border-white rounded-full"
            >
              <Image src="/icons/add.svg" alt="Add" width={16} height={16} />
            </button> */}
            {/* <button
              className={`bg-[#2F90B0] rounded-full flex items-center justify-center w-[45px] h-[45px] text-white border-2 border-white px-3 py-1 ${
                selectedAlertIds.length !== 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleOpenEditUserPopup}
              disabled={selectedAlertIds.length !== 1}
            >
              <Image src="/icons/edit.svg" alt="Edit" width={35} height={35} />
            </button>
            <button
              className={`bg-red-500 rounded-full flex items-center justify-center w-[45px] h-[45px] text-white border-2 border-white px-3 py-1 ${
                selectedAlertIds.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleDeleteSelectedAlerts}
              disabled={selectedAlertIds.length === 0}
            >
              <Image src="/icons/del.svg" alt="Delete" width={35} height={35} />
            </button> */}
          </div>
        </div>

        <div
          className="p-6 rounded-[15px]"
          style={{ backgroundColor: "#2F90B026" }}
        >
          {/* Display Selected Rows Count */}
          <div className="mb-4 text-white">
            {selectedAlertIds.length}{" "}
            {selectedAlertIds.length === 1 ? "row" : "rows"} selected
          </div>
          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full min-w-[700px] text-left border-separate border-spacing-y-2">
              <thead
                className="shadow-md border-none"
                style={{ backgroundColor: "#2F90B04D" }}
              >
                <tr>
                  <th className="th-class">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        className="cursor-pointer"
                      />
                    </div>
                  </th>
                  <th className="px-5 py-3 font-[400] text-center">No</th>
                  <th className="px-5 py-3 font-[400]">Username</th>
                  <th className="px-5 py-3 font-[400]">Company</th>
                  <th className="th-class font-[400] text-center">Alerts</th>
                </tr>
              </thead>
              <tbody>
                {currentPageUsers.length < 1 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex flex-col items-center rounded-[10px] justify-center h-[400px] bg-[#2323238A]">
                        <Image
                          src="/icons/no-data.svg"
                          alt="No Data"
                          width={100}
                          height={100}
                        />
                        <p className="text-gray-500 mt-4 text-lg">
                          No data available
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentPageUsers.map((user, idx) => (
                    <tr
                      key={user._id}
                      className={`hover:bg-gray-600 text-[#FFFFFFB2] ${
                        selectedAlertIds.includes(user._id)
                          ? "bg-gray-600"
                          : "bg-[#2323238A]"
                      }`}
                    >
                      <td className="td-class text-center">
                        <input
                          type="checkbox"
                          checked={selectedAlertIds.includes(user._id)}
                          onChange={() => handleRowSelection(user._id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="td-class text-center">{idx}</td>
                      <td className="td-class">{user.user.username}</td>
                      <td className="td-class">{user.user.email}</td>
                      <td className="td-class text-center">
                        {user.alertCount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {currentPageUsers.length > 1 && (
            <div className="p-4 flex justify-end items-center space-x-2">
              <button className="mx-3" onClick={handleBack}>
                <Image src={"/back.svg"} height={10} width={10} alt={"icon"} />
              </button>
              {currentPage > 3 && <span className="px-4 py-2">...</span>}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className={`flex items-center justify-center w-[20px] h-[20px] rounded-full ${
                    currentPage === page ? "bg-[#2F90B0] text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages - 2 && (
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

        {/* Add User Popup */}
        {/* {addAlertPopup && (
          <AddAlertPopup
            isOpen={addAlertPopup}
            onClose={handleCloseAddAlertPopup}
          />
        )} */}

        {/* Edit User Popup */}
        {isEditVisible && (
          <EditAlertPopup
            isOpen={isEditVisible}
            alertData={alertToEdit}
            onSave={handleSaveAlertEdits}
            onClose={handleCloseEditAlertPopup}
          />
        )}

        {/* Delete Confirmation Popup */}
        {isDeleteConfirmationVisible && (
          <DeleteAlertPopup
            alertId={selectedAlertId}
            onDelete={confirmDeleteSelection}
            onClose={cancelDeleteSelection}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default Alerts;
