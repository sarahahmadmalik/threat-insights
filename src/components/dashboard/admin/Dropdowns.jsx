"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import AddDropdownPopup from "@/components/popups/AddDropdownPopup";
import EditDropdownPopup from "@/components/popups/EditDropdownPopup";

function Dropdowns({ allDropdowns }) {
  const [dropdowns, setDropdowns] = useState(allDropdowns);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCreatePopup, setIsCreatePopup] = useState(false);
  const [newDropdown, setNewDropdown] = useState({ title: "", options: [""] });
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updatedData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dropdowns`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        if (!data.error) {
          setDropdowns(data);
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

  const handleOpenPopup = (dropdown) => {
    setSelectedDropdown(dropdown);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedDropdown(null);
    setShowPopup(false);
    setIsCreatePopup(false);
    setNewDropdown({ title: "", options: [""] });
  };

  const handleAddDropdown = () => {
    setIsCreatePopup(true);
  };

  const handleDeleteDropdown = (id) => {
    setDropdowns(dropdowns.filter((dropdown) => dropdown._id !== id));
    toast.success("Dropdown Deleted Successfully");
    handleClosePopup();
  };

  const handleCloseAddDropdownPopup = () => {
    setIsCreatePopup(false);
    setNewDropdown({ title: "", options: [""] });
  };

  const handleSaveAddDropdownPopup = async (dropdown) => {
    setLoading(true);
    try {
      const newDropdownData = {
        title: newDropdown.title,
        options: newDropdown.options,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dropdowns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dropdown),
        }
      );

      const data = await response.json();

      if (!data.error) {
        setLoading(false);
        handleCloseAddDropdownPopup();
        setIsDataUpdated(true);
        toast.success("Dropdown added successfully!");
      } else {
        toast.error(data.error || "Failed to add dropdown");
      }
    } catch (error) {
      console.error("Error creating dropdown:", error);
      toast.error("Internal server error");
    }
    setLoading(false);
  };


  const handleSaveEditDropdown = async (updatedDropdown) => {
    setLoading(true);
    try {
      const updatedDropdownData = {
        _id: updatedDropdown._id,
        title: updatedDropdown.title,
        options: updatedDropdown.options,
      };

      // Send the PUT request to the API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dropdowns`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDropdownData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!data.error) {
        setLoading(false);
        setIsDataUpdated(true);
        setShowPopup(false);
        toast.success("Dropdown updated successfully!");
      } else {
        toast.error(data.error || "Failed to update dropdown");
      }
    } catch (error) {
      console.error("Error updating dropdown:", error);
      toast.error("Internal server error");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="shadow rounded-lg py-6">
        <div className="p-4 flex justify-between items-center">
          <div className="flex justify-end w-full space-x-2">
            {/* Add Dropdown Button */}
            <button
              onClick={handleAddDropdown}
              className="bg-[#8087C11F] flex items-center  justify-center text-white px-3 py-1 w-[45px] h-[45px] border-2 border-white rounded-full"
            >
              <Image src="/icons/add.svg" alt="Add" width={20} height={20} />
            </button>
          </div>
        </div>
        <div
          className="p-6 rounded-[15px]"
          style={{ backgroundColor: "#2F90B026" }}
        >
          {/* Dropdown Buttons */}
          {dropdowns.length === 0 ? (
            <div className="flex flex-col items-center rounded-[10px] justify-center h-[400px] ">
              <Image
                src="/icons/no-data.svg"
                alt="No Data"
                width={100}
                height={100}
              />
              <p className="text-gray-500 mt-4 text-lg">
                No dropdowns available
              </p>
            </div>
          ) : (
            // Dropdown Buttons
            dropdowns.map((dropdown) => (
              <button
                key={dropdown._id}
                onClick={() => handleOpenPopup(dropdown)}
                className="bg-blue-500 text-white px-6 py-3 m-3 rounded-lg text-lg"
              >
                {dropdown.title}
              </button>
            ))
          )}
        </div>
      </div>

      {showPopup && (
        <EditDropdownPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onSave={handleSaveEditDropdown}
          dropdownData={selectedDropdown}
          onDelete={handleDeleteDropdown}
          loading={loading}
        />
      )}

      {/* Add Dropdown Popup */}
      {isCreatePopup && (
        <AddDropdownPopup
          onClose={handleCloseAddDropdownPopup}
          onSave={handleSaveAddDropdownPopup}
          isOpen={isCreatePopup}
          loading={loading}
        />
      )}
    </AdminLayout>
  );
}

export default Dropdowns;
