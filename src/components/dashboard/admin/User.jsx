"use client";

import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { useEffect, useState } from "react";
import Image from "next/image";
import DomainPopup from "@/components/popups/DomainPopup";
import AddUserPopup from "@/components/popups/AddUserPopup";
import EditUserPopup from "@/components/popups/EditUserPopup";
import DeleteUserPopup from "@/components/popups/DeleteUserPopup";
import toast, { Toaster } from "react-hot-toast";

const Users = ({ allUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //   const [users, setUsers] = useState(
  //     Array(125)
  //       .fill(0)
  //       .map((_, i) => ({
  //         no: i + 1,
  //         username: "John",
  //         password: "*******",
  //         email: `user${i}@gmail.com`,
  //         userType: "User",
  //         domains: [`example${i}.com`, `subdomain${i}.example.com`],
  //         isSelected: false,
  //       }))
  //   );
  const [users, setUsers] = useState(allUsers);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState();
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [isUserDataUpdated, setIsUserDataUpdated] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // useEffect(() => {
  //   if (!isUserDataUpdated) setUsers(allUsers);
  // }, []);

  useEffect(() => {
    const updatedUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        if (!data.error) {
          setUsers(data);
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

    if (isUserDataUpdated) {
      updatedUserData();
      setIsUserDataUpdated(false);
    }
  }, [isUserDataUpdated]);

  const pages = Math.ceil(users?.length / pageSize);
  const currentUsers = users?.slice(
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
    const updatedSelectedRows = isChecked ? users.map((user) => user._id) : [];
    setSelectedRows(updatedSelectedRows);
  };

  const handleRowSelect = (userId) => {
    const updatedSelectedRows = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];
    setSelectedRows(updatedSelectedRows);
  };

  const handleViewDomains = (domains) => {
    setSelectedDomains(domains);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // console.log("users", users);

  const handleOpenAddUserPopup = () => {
    setIsAddUserOpen(true);
  };

  const handleCloseAddUserPopup = async (newUser, isAdded) => {
    if (isAdded === true) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );

        const result = await response.json();

        if (result.error) {
          toast.error(
            result.error || "An error occurred while adding the user."
          );
          console.error(result.error || "Failed to add user");
          return result.error;
        }

        setIsUserDataUpdated(true);
        toast.success("User added successfully!");
      } catch (error) {
        toast.error(result.error || "An error occurred while adding the user.");
        console.error("Error adding user:", error);

        return error;
      }
    }

    setLoading(false);
    setIsAddUserOpen(false);
  };

  const handleOpenEditUserPopup = () => {
    const selectedUsers = users.filter((user) =>
      selectedRows.includes(user._id)
    );

    if (selectedUsers.length === 1) {
      setEditUserData(selectedUsers[0]);
      setIsEditUserOpen(true);
    } else {
      toast.error("Please select only one row to edit!");
    }
  };

  const handleSaveEditUser = async (updatedUser) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
            domains: updatedUser.domains,
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        toast.error(
          result.error || "An error occurred while updating the user."
        );
        console.log(result.error || "Failed to update user");
        setLoading(false);
        return;
      }

      setIsUserDataUpdated(true);

      toast.success("User details updated successfully!");
      handleCloseEditUserPopup();
    } catch (error) {
      toast.error("An error occurred while updating the user.");
      console.log("Error updating user:", error);
    }

    setSelectedRows([])
    setLoading(false); 
  };

  const handleCloseEditUserPopup = () => {
    setIsEditUserOpen(false);
    setEditUserData(null);
  };

  const handleDeleteUsers = () => {
    // Open delete confirmation popup
    setIsDeleteConfirmOpen(true);
  };

  const changePageOnDeletion = () => {
    // Check if the current page has no data and adjust page number
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user._id)
    );
    const updatedCurrentUsers = updatedUsers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    if (updatedCurrentUsers.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const confirmDelete = async () => {
    console.log(selectedRows);
    try {
      // Perform API call for deletion
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedRows,
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        toast.error(
          result.error || "Failed to delete users. Please try again."
        );
        return;
      }

      setIsUserDataUpdated(true);
      setSelectedRows([]);
      setIsDeleteConfirmOpen(false);
      changePageOnDeletion();

      toast.success(result.message || "Selected users deleted successfully!");
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("An error occurred while deleting users. Please try again.");
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false); // Close the delete confirmation popup
    setSelectedRows([]);
  };

  const cancelEditPopup = () => {
    setEditUserData(null);
    setIsEditUserOpen(false);
    setSelectedRows([]);
  };

  const isAnyRowSelected = selectedRows.length > 0;
  const allowEdit = selectedRows.length === 1;
  console.log("allowEdit", allowEdit);

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
                !allowEdit ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleOpenEditUserPopup}
              disabled={!allowEdit}
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
                className="shadow-md border-none"
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
                  <th className="th-class px-5 py-3 font-[400]">No</th>
                  <th className="th-class px-5 py-3 font-[400]">Username</th>
                  {/* <th className="th-class px-5 py-3 font-[400]">Password</th> */}
                  <th className="th-class px-5 py-3 font-[400]">Email</th>
                  <th className=" th-class px-5 py-3 font-[400] text-center">
                    User type
                  </th>
                  <th className="th-class font-[400] text-center">
                    Monitored Domains
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.length < 1 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-6 bg-[#2323238A]">
                      <div className="flex flex-col items-center">
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
                  currentUsers?.map((user, idx) => (
                    <tr
                      key={user._id}
                      className={`hover:bg-gray-600 text-[#FFFFFFB2] ${
                        selectedRows.includes(user._id)
                          ? "bg-gray-600"
                          : "bg-[#2323238A]"
                      }`}
                    >
                      <td className="td-class text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(user._id)}
                          onChange={() => handleRowSelect(user._id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="td-class text-center">{idx + 1}</td>
                      <td className="td-class">{user.username}</td>
                      {/* <td className="td-class">{"********"}</td> */}
                      <td className="td-class">{user.email}</td>
                      <td className="td-class text-center">{user.role}</td>
                      <td className="td-class overflow-hidden">
                        <div className="flex justify-center">
                          {user.domains && user.domains.length > 0 ? (
                            <button
                              className="text-blue-500 underline underline-offset-4"
                              onClick={() => handleViewDomains(user.domains)}
                            >
                              View Domains
                            </button>
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
      {isAddUserOpen && (
        <AddUserPopup
          loading={loading}
          setLoad={setLoading}
          isOpen={isAddUserOpen}
          onClose={handleCloseAddUserPopup}
        />
      )}
      {isEditUserOpen && (
        <EditUserPopup
          loading={loading}
          isOpen={isEditUserOpen}
          userData={editUserData}
          onClose={handleSaveEditUser}
          onCancel={cancelEditPopup}
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
