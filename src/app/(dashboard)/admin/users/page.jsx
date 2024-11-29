"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import Image from "next/image";
import DomainPopup from "@/components/popups/DomainPopup";
import AddUserPopup from "@/components/popups/AddUserPopup";
import EditUserPopup from "@/components/popups/EditUserPopup";
import DeleteUserPopup from "@/components/popups/DeleteUserPopup";
import toast, { Toaster } from "react-hot-toast";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [users, setUsers] = useState(
    Array(125)
      .fill(0)
      .map((_, i) => ({
        no: i + 1,
        username: "John",
        password: "*******",
        email: `user${i}@gmail.com`,
        userType: "User",
        domains: [`example${i}.com`, `subdomain${i}.example.com`],
        isSelected: false,
      }))
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Domain popup state
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState();
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // State for delete confirmation popup

  const pages = Math.ceil(users.length / pageSize);
  const currentUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pages) {
      setCurrentPage(page);
    }
  };

  const handleBack = () => {
    setCurrentPage(1);
  };

  const handleNext = () => {
    setCurrentPage(pages);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(pages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => ({
        ...user,
        isSelected: isChecked,
      }));
      setSelectedRows(isChecked ? updatedUsers : []); // Add all rows to selected when 'select all' is checked
      return updatedUsers;
    });
  };

  const handleRowSelect = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].isSelected = !updatedUsers[index].isSelected;

    const updatedSelectedRows = updatedUsers
      .filter((user) => user.isSelected)
      .map((user) => user.no);

    setUsers(updatedUsers);
    setSelectedRows(updatedSelectedRows);
  };

  const handleViewDomains = (domains) => {
    setSelectedDomains(domains);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenAddUserPopup = () => {
    setIsAddUserOpen(true); // Open the AddUserPopup
  };

  const handleCloseAddUserPopup = () => {
    setIsAddUserOpen(false); // Close the AddUserPopup
  };

  const handleOpenEditUserPopup = () => {
    const selectedUsers = users.filter((user) => user.isSelected);

    if (selectedUsers.length === 1) {
      setEditUserData(selectedUsers[0]);
      setIsEditUserOpen(true);
    } else {
      toast.error("Please select only one row to edit!");
    }
  };

  const handleCloseEditUserPopup = () => {
    setIsEditUserOpen(false);
    setEditUserData(null);
  };

  const handleSaveEditUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.no === updatedUser.no ? { ...user, ...updatedUser } : user
      )
    );
    toast.success("User details updated successfully!");
    handleCloseEditUserPopup();
  };

  const handleDeleteUsers = () => {
    // Open delete confirmation popup
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    // Perform the deletion
    const remainingUsers = users.filter(
      (user) => !selectedRows.includes(user.no)
    );
    setUsers(remainingUsers);
    setSelectedRows([]); // Clear selected rows after deletion
    setIsDeleteConfirmOpen(false); // Close the delete confirmation popup
    toast.success("Selected users deleted successfully!");
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false); // Close the delete confirmation popup
  };

  const isAnyRowSelected = selectedRows.length > 0;

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="shadow rounded-lg py-6">
        <div className="p-4 flex justify-between items-center">
          <div className="flex justify-end w-full space-x-2">
            {/* Add User Button */}
            <button
              onClick={handleOpenAddUserPopup}
              className="bg-[#8087C11F] flex items-center  justify-center text-white px-3 py-1 w-[45px] h-[45px] border-2 border-white rounded-full"
            >
              <Image src="/icons/add.svg" alt="Add" width={16} height={16} />
            </button>
            {/* Edit Button */}
            <button
              className={`bg-[#2F90B0] rounded-full flex items-center justify-center w-[45px] h-[45px] text-white border-2 border-white px-3 py-1 ${
                !isAnyRowSelected ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleOpenEditUserPopup}
              disabled={!isAnyRowSelected}
            >
              <Image src="/icons/edit.svg" alt="Edit" width={35} height={35} />
            </button>
            {/* Delete Button */}
            <button
              className={`bg-red-500 rounded-full flex items-center justify-center w-[45px] h-[45px] text-white border-2 border-white px-3 py-1 ${
                !isAnyRowSelected ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleDeleteUsers}
              disabled={!isAnyRowSelected}
            >
              <Image src="/icons/del.svg" alt="Delete" width={35} height={35} />
            </button>
          </div>
        </div>
        <div
          className="p-6 rounded-[15px]"
          style={{ backgroundColor: "#2F90B026" }}
        >
          {/* Display Selected Rows Count */}
          <div className="mb-4 text-white">
            {selectedRows.length} {selectedRows.length === 1 ? "row" : "rows"}{" "}
            selected
          </div>

          {/* Responsive Table Wrapper */}
          <div className="overflow-auto rounded-lg shadow-md">
            <table className="w-full min-w-[700px] text-left border-separate border-spacing-y-2">
              <thead
                className="shadow-md border-none "
                style={{ backgroundColor: "#2F90B04D" }}
              >
                <tr>
                  <th className="th-class">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="px-5 py-3 font-[400]">No</th>
                  <th className="px-5 py-3 font-[400]">Username</th>
                  <th className="px-5 py-3 font-[400]">Password</th>
                  <th className="px-5 py-3 font-[400]">Email</th>
                  <th className="px-5 py-3 font-[400] text-center">
                    User type
                  </th>
                  <th className="th-class font-[400] text-center">
                    Monitored Domains
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-gray-600 text-[#FFFFFFB2] ${
                      user.isSelected ? "bg-gray-600" : "bg-[#2323238A]"
                    }`}
                  >
                    <td className="td-class text-center">
                      <input
                        type="checkbox"
                        checked={user.isSelected}
                        onChange={() =>
                          handleRowSelect((currentPage - 1) * pageSize + idx)
                        }
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="td-class text-center">{user.no}</td>
                    <td className="td-class">{user.username}</td>
                    <td className="td-class">{user.password}</td>
                    <td className="td-class">{user.email}</td>
                    <td className="td-class text-center">{user.userType}</td>
                    <td className="td-class overflow-hidden">
                      <div className="flex justify-center">
                        <button
                          className="text-blue-500 underline"
                          onClick={() => handleViewDomains(user.domains)}
                        >
                          View Domains
                        </button>
                      </div>
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
            {currentPage < pages - 2 && <span className="px-4 py-2">...</span>}
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
      </div>

      {isPopupOpen && (
        <DomainPopup domains={selectedDomains} onClose={handleClosePopup} />
      )}
      {isAddUserOpen && <AddUserPopup onClose={handleCloseAddUserPopup} />}
      {isEditUserOpen && (
        <EditUserPopup
          isOpen={isEditUserOpen}
          userData={editUserData}
          onClose={handleCloseEditUserPopup}
          onSave={handleSaveEditUser}
        />
      )}

      {isDeleteConfirmOpen && (
        <DeleteUserPopup
          isOpen={isDeleteConfirmOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </AdminLayout>
  );
};

export default Users;
