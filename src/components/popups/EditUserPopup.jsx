"use client";
import { useState, useEffect } from "react";
import Select from "@/components/ui/Select";
import LoadingDots from "../ui/LoadingDots";

const EditUserPopup = ({ isOpen, onClose, loading, userData }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && userData) {
      // Populate fields if user data is available
      setFullName(userData.name || "");
      setUsername(userData.username || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || "");
      setUserType(userData.role || "");
      setDomains(userData.domains || []);
    }
  }, [isOpen, userData]);

  const validateAllFields = () => {
    let updatedErrors = {};
    let hasErrors = false;

    // Username validation
    updatedErrors.username = !username
      ? "Username is required."
      : username.includes("-")
      ? "Username should not contain hyphens."
      : username.includes(" ")
      ? "Username should not contain spaces."
      : username.length < 3
      ? "Username must be at least 3 characters."
      : username.length > 20
      ? "Username must be less than 20 characters."
      : "";

    // Phone validation
    updatedErrors.phone = !phone
      ? "Phone number is required."
      : !/^\+([0-9]{1,4})\d{10}$/.test(phone)
      ? "Phone number must include a valid country code and a 10-digit phone number."
      : "";

    // Full Name validation
    updatedErrors.fullName = !fullName
      ? "Full name is required."
      : fullName.length < 3
      ? "Full name must be at least 3 characters."
      : fullName.length > 50
      ? "Full name must be less than 50 characters."
      : /[^a-zA-Z\s]/.test(fullName)
      ? "Full name should not contain numbers or special characters."
      : "";

    // Email validation
    updatedErrors.email = !email
      ? "Email is required."
      : !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)
      ? "Invalid email address."
      : "";

    // Password validation
    updatedErrors.password =
      password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,}$/.test(
        password
      )
        ? "Password must be at least 6 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
        : "";

    // Confirm Password validation
    updatedErrors.confirmPassword =
      confirmPassword !== password ? "Passwords do not match." : "";

    hasErrors = Object.values(updatedErrors).some((error) => error);
    setErrors(updatedErrors);

    return hasErrors;
  };

  const handleSubmit = () => {
    if (validateAllFields()) return;

    const updatedPassword = password ? password : userData.password;

    const updatedUserData = {
      _id: userData._id,
      username,
      name: fullName,
      email,
      updatedPassword,
      phone,
      role: userType,
    };

    onClose(updatedUserData, true);
  };

  if (!isOpen) {
    return null;
  }

  const userTypeOptions = [
    { label: "System Analyst", value: "analyst" },
    { label: "Customer", value: "customer" },
  ];

  return (
    <div className="fixed inset-0 overflow-auto min-h-screen bg-black  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white mt-[6rem]  p-8 rounded-[15px] w-96 max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full mt-6">
            <h2 className="text-lg sm:text-[22px] font-[700] text-center text-[#1E1E1E]">
              Edit User Details
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-2xl flex items-center justify-center border-2 border-red-500 rounded-full px-2 w-[30px] h-[30px]  text-red-500 mb-10"
          >
            <p className="mt-[-2px]">&times;</p>
          </button>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* User Type */}
          <Select
            options={userTypeOptions}
            placeholder="Select User Type"
            onSelect={setUserType}
            className="w-full text-slate-600"
            value={userType}
          />

          {/* Domains */}
          {userType !== "system_analyst" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Domains
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add domain"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-4 py-3 rounded-md text-slate-800 border"
                  />
                  <button
                    onClick={() => setDomains([...domains, newDomain])}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2">
                  {domains.map((domain, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Submit button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-500 text-white rounded-md"
            >
              {loading ? <LoadingDots /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPopup;
