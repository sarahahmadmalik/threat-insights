"use client";

import { useState } from "react";
import Sidebar from "@/components/MobileSidebar";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export default function LayoutClient({ username, children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");

    Cookies.remove("auth_token");

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
      });

      toast.success("Logged out successfully", { id: loadingToast });
      router.push("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen relative text-white">
      <Toaster position="top-center" />
      <div
        className="absolute -z-10 inset-0 bg-gradient-to-t from-[#1A2237] via-[#1A2237] to-transparent opacity-60"
        style={{
          backgroundImage: "url('/landing.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Header */}
      <header className="flex w-full justify-between items-center bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 shadow-md">
        {/* Hamburger Menu */}
        <div className="flex items-center gap-x-5">
          <button
            onClick={toggleSidebar}
            className="sm:hidden text-white text-2xl"
          >
            ☰
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={80}
              height={60}
              className="object-contain sm:w-70 md:w-40"
            />
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center space-x-4">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <Image
              src="/icons/user.svg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="hidden sm:block">
              Welcome, {username || "Guest"}
            </span>
          </button>

          {/* Dropdown */}
          {isDropdownOpen &&
            createPortal(
              <div
                className={`absolute overflow-hidden z-50 right-8 top-16 bg-white text-black rounded shadow-lg w-48 transition-transform duration-300 ease-out ${
                  isDropdownOpen
                    ? "transform opacity-100 translate-y-0"
                    : "transform opacity-0 translate-y-4"
                }`}
              >
                <ul>
                  <li
                    onClick={() => router.push("/customer/profile")}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Profile
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>,
              document.body
            )}
        </div>
      </header>

      {/* Sidebar */}
      <div className="sm:hidden">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </div>

      {/* Main Content */}
      <main className="w-full p-3 sm:p-6">{children}</main>
    </div>
  );
}
