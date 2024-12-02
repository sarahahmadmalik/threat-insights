"use client";

import { useState } from "react";
import AdminLayout from "@/components/dashboard/admin/AdminLayout";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

function Dropdowns() {
  const [dropdowns, setDropdowns] = useState([
    { id: 1, title: "Actor Type", options: ["Activist", "Hacktivist", "Insider"] },
    { id: 2, title: "Target Sector", options: ["Finance", "Healthcare", "Technology"] },
    { id: 3, title: "Threat Level", options: ["High", "Medium", "Low"] },
  ]);

  const [selectedDropdown, setSelectedDropdown] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = (dropdown) => {
    setSelectedDropdown(dropdown);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedDropdown(null);
    setShowPopup(false);
  };

  const handleAddDropdown = () => {
    const newDropdown = {
      id: dropdowns.length + 1,
      title: "New Dropdown",
      options: [],
    };
    setDropdowns([...dropdowns, newDropdown]);
  };

  const handleDeleteDropdown = (id) => {
    setDropdowns(dropdowns.filter((dropdown) => dropdown.id !== id));
    handleClosePopup();
  };

  const handleEditDropdown = (updatedDropdown) => {
    setDropdowns(
      dropdowns.map((dropdown) =>
        dropdown.id === updatedDropdown.id ? updatedDropdown : dropdown
      )
    );
    handleClosePopup();
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
              className="bg-[#8087C11F] flex items-center justify-center text-white px-3 py-1 w-[45px] h-[45px] border-2 border-white rounded-full"
            >
              <Image src="/icons/add.svg" alt="Add" width={16} height={16} />
            </button>
          </div>
        </div>
        <div
          className="p-6 rounded-[15px]"
          style={{ backgroundColor: "#2F90B026" }}
        >
          {/* Dropdown Buttons */}
          {dropdowns.map((dropdown) => (
            <button
              key={dropdown.id}
              onClick={() => handleOpenPopup(dropdown)}
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded-md"
            >
              {dropdown.title}
            </button>
          ))}
        </div>
      </div>

      {/* Popup */}
      {showPopup && selectedDropdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{selectedDropdown.title}</h2>
            <ul className="mb-4">
              {selectedDropdown.options.map((option, index) => (
                <li key={index} className="text-gray-700">
                  {option}
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <button
                onClick={() => handleEditDropdown({ ...selectedDropdown, title: "Updated Title" })}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteDropdown(selectedDropdown.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Dropdowns;
