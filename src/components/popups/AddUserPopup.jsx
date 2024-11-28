"use client";
import { useState } from "react";
import Select from "@/components/ui/Select"; // Import your custom Select component

const AddUserPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");  // This will hold the selected user type
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [error, setError] = useState("");

  const handleAddDomain = () => {
    if (domains.length >= 15) {
      setError("You can only add up to 15 domains.");
      return;
    }
    if (newDomain && !domains.includes(newDomain)) {
      setDomains([...domains, newDomain]);
      setNewDomain("");
      setError("");
    } else {
      setError("Invalid domain or domain already added.");
    }
  };

  const handleRemoveDomain = (index) => {
    const updatedDomains = domains.filter((_, idx) => idx !== index);
    setDomains(updatedDomains);
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!name || !email || !userType || domains.length === 0) {
      setError("All fields are required.");
      return;
    }

    // Submit the data here
    // You can handle the API call or submit logic here

    // Reset form after submission
    setName("");
    setEmail("");
    setUserType("");
    setDomains([]);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  const userTypeOptions = [
    { label: "System Analyst", value: "system_analyst" },
    { label: "User", value: "user" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-[15px] w-96 max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full mt-6">
            <h2 className="text-lg sm:text-[22px] font-[700] text-center text-[#1E1E1E]">
              Please Add the New User
            </h2>
          </div>

          <button onClick={onClose} className="text-2xl flex items-center justify-center border-2 border-red-500 rounded-full px-2 w-[30px] h-[30px]  text-red-500 mb-10">
            <p className="mt-[-2px]">&times;</p>
          </button>
        </div>

        {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}

        <div className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* User Type (dropdown) */}
          <div>
            <Select
              options={userTypeOptions}
              placeholder="Select User Type"
              onSelect={setUserType} // Set the selected user type
              className={"w-full text-slate-600"}
            />
          </div>

          {/* Monitored Domains */}
          <div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Add Domain"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none transition-all duration-300 ease-in-out border focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddDomain}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2 mt-2">
              {domains.map((domain, idx) => (
                <li key={idx} className="flex items-center justify-between text-gray-700">
                  {domain}
                  <button
                    onClick={() => handleRemoveDomain(idx)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-[#2F90B0] hover:bg-[#1f6780] text-white rounded-lg mt-4"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserPopup;
