"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "This is a sample bio",
    avatar: "/icons/user.svg",
    password: "********", // Placeholder for password
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordVerificationSent, setPasswordVerificationSent] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle password change (new password)
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  // Handle password verification code sending
  const handleSendVerificationCode = () => {
    // Simulate sending a verification code to email
    setPasswordVerificationSent(true);
    toast.success("Verification code sent to your email!", {
      duration: 4000,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!", {
      duration: 4000,
    });
    setIsEditing(false);
  };

  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      {/* Include the Toaster for displaying notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <button onClick={() => router.push("/customer/home")} className="mb-3">
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
      </div>

      <div className="w-full flex sm:items-start flex-col sm:flex-row sm:gap-x-5 justify-start">
        {/* Profile Header */}
        <div className="flex items-center gap-x-2 mb-4 ml-6">
          <h3 className="text-[#2F90B0] font-[300] mt-2 uppercase text-[26px]">
            Profile
          </h3>
        </div>

        <div className="w-full max-w-lg sm:ml-6 flex flex-col items-start">
          <h1 className="text-[20px] text-center sm:text-left sm:text-[26px] uppercase font-[400] text-gray-800">
            {isEditing ? "Edit Profile" : "View Profile"}
          </h1>

          {/* Profile Form */}
          <form className="mt-6 space-y-4 w-full" onSubmit={handleSubmit}>
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
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                placeholder="Enter your name"
                disabled={!isEditing}
                required
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
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                placeholder="Enter your email"
                disabled={!isEditing}
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                placeholder="Tell us about yourself"
                disabled={!isEditing}
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture
              </label>
              <div className="flex items-center gap-x-3">
                <Image
                  src={profile.avatar}
                  width={80}
                  height={80}
                  alt="profile-avatar"
                  className="rounded-full"
                />
                {isEditing && (
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block text-sm text-gray-500 focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex items-center gap-x-3">
                {isEditingPassword ? (
                  <>
                    <input
                      type="password"
                      id="password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={handleSendVerificationCode}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Send Verification Code
                    </button>
                  </>
                ) : (
                  <span>******</span>
                )}
              </div>
              {passwordVerificationSent && (
                <div className="text-sm text-green-600 mt-2">
                  Verification code has been sent to your email!
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsEditingPassword((prev) => !prev)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                {isEditingPassword ? "Cancel Edit" : "Edit Password"}
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex gap-x-3">
              <button
                type="submit"
                className="w-[150px] bg-[#2F90B0] text-white px-4 py-2 rounded-lg hover:bg-[#2F90B0] focus:outline-none focus:ring-2 focus:ring-[#2F90B0]"
                disabled={!isEditing}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="w-[150px] bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
