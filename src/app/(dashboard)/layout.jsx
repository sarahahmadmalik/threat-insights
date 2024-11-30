"use client";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/MobileSidebar";

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

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
              alt="Threat Insights Logo"
              width={80}
              height={60}
              className="object-contain sm:w-70 md:w-40"
            />
          </div>
        </div>

        {/* Profile */}
        <div className="relative flex items-center space-x-4">
          <Image
            src="/icons/user.svg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="hidden sm:block">Welcome, [Mr. Jone]</span>
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
