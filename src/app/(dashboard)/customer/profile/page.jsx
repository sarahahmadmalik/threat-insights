"use client";

import { useState } from "react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("12235");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to toggle edit mode

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    profilePic: "/icons/user.svg", // Placeholder image
  });

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) =>
    setConfirmNewPassword(e.target.value);
  const handleVerificationCodeChange = (e) =>
    setVerificationCode(e.target.value);

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    setOtpSent(false);
    setVerificationSuccess(false);
  };

  const handleSendVerificationCode = () => {
    setOtpSent(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setVerificationSuccess(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    alert("Profile saved successfully");
    setIsEditing(false); // Disable edit mode after saving
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sm:p-10 p-5 bg-white min-h-screen rounded-md text-black">
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <button onClick={() => router.push("/customer/home")} className="mb-3">
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
      </div>

      <div className="w-full flex flex-col sm:flex-row sm:items-start sm:gap-x-7 justify-start">
        {/* Profile Header */}
        <div className="flex items-center gap-x-2 mb-4 ml-6">
          <h3 className="text-[#2F90B0] font-[300] mt-2 uppercase text-[26px]">
            Profile
          </h3>
        </div>

        {/* Tabs */}
        <div className="sm:ml-5">
          <div className="flex mb-4 ">
            <button
              className={`px-4 py-2 text-md uppercase font-[400] ${
                activeTab === "profile" ? "border-b-2 border-[#2F90B0]" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`ml-4 px-4 py-2 text-md uppercase font-[400] ${
                activeTab === "password" ? "border-b-2  border-[#2F90B0]" : ""
              }`}
              onClick={() => setActiveTab("password")}
            >
              Password
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleSubmitProfile}>
              <div className="space-y-4 max-w-lg">
                {/* Profile Picture */}

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                    placeholder="Enter your name"
                    required
                    disabled={!isEditing} // Disable input when not editing
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                    placeholder="Enter your email"
                    required
                    disabled={!isEditing} // Disable input when not editing
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                    placeholder="Enter your phone number"
                    required
                    disabled={!isEditing} // Disable input when not editing
                  />
                </div>
                <div className="flex items-center">
                  <Image
                    src={profile.profilePic}
                    alt="Profile Pic"
                    width={80} // Set the width (20 * 4 for scaling)
                    height={80} // Set the height (20 * 4 for scaling)
                    className="rounded-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    disabled={!isEditing} // Disable file input when not editing
                    className="ml-4 py-2 px-4 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Edit/Save Button */}
                <div className="flex justify-between gap-x-4 mt-4">
                  {isEditing ? (
                    <button
                      type="submit"
                      className="bg-[#2F90B0] text-white px-6 py-2 rounded-lg"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)} // Enable editing mode
                      className="bg-[#2F90B0] text-white px-6 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <div>
              <div className="space-y-4 max-w-lg">
                {/* Current Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="ml-2 text-blue-500"
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className=" my-4">
                    <button
                      type="button"
                      onClick={handleChangePasswordClick}
                      className="bg-[#2F90B0] text-white px-6 py-2 rounded-lg"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* OTP Input */}
                {isChangingPassword && !otpSent && (
                  <div>
                    <label
                      htmlFor="verificationCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Verification Code
                    </label>
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                      placeholder="Enter OTP"
                    />
                    <button
                      type="button"
                      onClick={handleSendVerificationCode}
                      className="mt-2 bg-[#2F90B0] text-white px-6 py-2 rounded-lg"
                    >
                      Send OTP
                    </button>
                  </div>
                )}

                {/* New Password Fields */}
                {otpSent && !verificationSuccess && (
                  <div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirmNewPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={handleConfirmPasswordChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-lg"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}

                {/* Success Message */}
                {verificationSuccess && (
                  <div className="mt-4 text-green-500">
                    Password changed successfully!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
