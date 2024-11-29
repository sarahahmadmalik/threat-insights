"use client";

import { useState, useEffect } from "react";

const EditTicketPopup = ({ isOpen, ticketData, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ticketData) {
      setTitle(ticketData.title);
      setDescription(ticketData.description);
      setStatus(ticketData.status || "Open");
    }
  }, [ticketData]);

  const handleSave = () => {
    // Input validations
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }
    if (status !== "Open" && status !== "Closed") {
      setError("Invalid status. Must be 'Open' or 'Closed'.");
      return;
    }

    // Pass validated data to the onSave callback
    onSave({
      id: ticketData.id,
      title,
      description,
      status,
    });

    // Reset state and close the popup
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-[15px] w-96 max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-[22px] font-[700] text-center text-[#1E1E1E]">
            Edit Ticket Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl flex items-center justify-center border-2 border-red-500 rounded-full px-2 w-[30px] h-[30px] text-red-500"
          >
            <p className="mt-[-2px]">&times;</p>
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm mb-2">{error}</p>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Ticket Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-2 bg-[#2F90B0] hover:bg-[#1f6780] text-white rounded-lg mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTicketPopup;
