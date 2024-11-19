"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const IntelligenceCard = ({
  category,
  id,
  date,
  description,
  title,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false); // Track button visibility
  const router = useRouter(); // Next.js Router for page navigation

  const categoryColors = {
    CRITICAL: "border-[#D8CBFD]",
    HIGH: "border-[#F4B1B1]",
    MEDIUM: "border-[#F0D88F]",
    LOW: "border-[#BBEEA9]",
  };

  // Trimming the summary
  const trimmedSummary =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  const handleToggleOpen = (e) => {
    e.stopPropagation(); // Prevent the card's `onClick` from triggering
    setIsOpen((prev) => !prev);
  };

  const handleCardClick = (e) => {
    e.stopPropagation(); // Prevent card click from navigating away
    setShowButton((prev) => !prev); // Toggle button visibility
  };

  const handleOpenButtonClick = () => {
    // Navigate to the page when the "Open" button is clicked
    router.push(`/customer/intelligence/${id}`);
  };

  return (
    <div
      className={`border-l-8 ${
        categoryColors[category.toUpperCase()]
      } px-4 py-6 mb-4 bg-white shadow rounded cursor-pointer`}
      onClick={handleCardClick} // Toggles button visibility on card click
    >
      {/* Title and Date on the same line */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm text-gray-500">{date}</span>
      </div>

      {/* Description (toggleable) */}
      <p className="text-sm mt-2">{isOpen ? description : trimmedSummary}</p>

      {/* Footer with Open/Close button */}
      <div className="w-full text-gray-500 mt-2 flex justify-end items-center">
        {/* "Open" button with sliding animation */}
        <button
          onClick={handleOpenButtonClick}
          className={`ml-4 px-4 py-2 text-sm font-[500] bg-[#2F90B0] text-white rounded-lg hover:bg-blue-500 transition-transform  duration-300 ease-out transform
           
          `}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default IntelligenceCard;
