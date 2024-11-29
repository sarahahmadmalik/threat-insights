"use client";

import { useState, useEffect } from "react";

const EditAlertPopup = ({ isOpen, alertData, onClose, onSave }) => {
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [alerts, setAlerts] = useState("");
  const [error, setError] = useState("");

  // Validate email function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (alertData) {
      setUsername(alertData.username);
      setCompany(alertData.company);
      setAlerts(alertData.alerts || "");
    }
  }, [alertData]);

  const handleSave = () => {
    // Input validations
    if (!username || !company || !alerts) {
      setError("All fields are required.");
      return;
    }
    if (!isValidEmail(company)) {
      setError("Please enter a valid company email.");
      return;
    }
    if (isNaN(alerts) || alerts <= 0) {
      setError("Alerts must be a positive number greater than zero.");
      return;
    }

    // Pass the validated data to the onSave callback
    onSave({
      id: alertData.id,
      username,
      company,
      alerts,
    });

    // Reset state and close the popup
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-[15px] w-96 max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full mt-6">
            <h2 className="text-lg sm:text-[22px] font-[700] text-center text-[#1E1E1E]">
              Edit Alert Details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-2xl flex items-center justify-center border-2 border-red-500 rounded-full px-2 w-[30px] h-[30px] text-red-500 mb-10"
          >
            <p className="mt-[-2px]">&times;</p>
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm mb-2">{error}</p>
        )}

        <div className="space-y-4">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <input
              type="email"
              placeholder="Company Email"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Alerts Number */}
          <div>
            <input
              type="number"
              placeholder="Number of Alerts"
              value={alerts}
              onChange={(e) => setAlerts(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
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

export default EditAlertPopup;
