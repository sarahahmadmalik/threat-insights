"use client";
import React, { useState } from "react";

const Pagination = ({ totalItems, pageSize, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / pageSize);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Add the first page
      pages.push(1);

      // Add dots if necessary
      if (currentPage > 3) {
        pages.push("...");
      }

      // Show two pages before and after the current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add dots if necessary
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Add the last page
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={index} className="px-2 py-1 text-gray-500">
            ...
          </span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => changePage(1)}
        className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
        disabled={currentPage === 1}
      >
        &#171;
      </button>
      <button
        onClick={() => changePage(currentPage - 1)}
        className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
        disabled={currentPage === 1}
      >
        &#8249;
      </button>
      {renderPagination()}
      <button
        onClick={() => changePage(currentPage + 1)}
        className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
        disabled={currentPage === totalPages}
      >
        &#8250;
      </button>
      <button
        onClick={() => changePage(totalPages)}
        className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
        disabled={currentPage === totalPages}
      >
        &#187;
      </button>
    </div>
  );
};

export default Pagination