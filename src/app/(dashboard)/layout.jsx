"use client";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function Layout({ children }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen relative text-white">
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
      <header className="flex  w-full justify-between items-center bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Threat Insights Logo"
            width={70} // Default width for small devices
            height={50}
            className="object-contain sm:w-70 md:w-40" // Responsive width
          />
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
            <span className="hidden sm:block">Welcome, [Mr. Jone]</span>
          </button>

          {/* Dropdown (Responsive) */}
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
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>,
              document.body
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full p-6">{children}</main>
    </div>
  );
}
