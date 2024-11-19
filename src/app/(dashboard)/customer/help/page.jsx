"use client";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Quill editor, only in the client side to avoid SSR issues
const Quill = dynamic(() => import("quill"), { ssr: false });
import "quill/dist/quill.snow.css";

export default function SupportTicket() {
  const router = useRouter();
  const quillRef = useRef(null); // Ref for the Quill editor container
  const fileInputRef = useRef(null); // Ref for the file input

  const [file, setFile] = useState(null); // State to manage the file upload

  useEffect(() => {
    if (quillRef.current && Quill) {
      // Initialize Quill editor only on the client side
      const quill = new Quill(quillRef.current, {
        theme: "snow", // Quill's snow theme
        placeholder: "Enter issue details",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"], // Text formatting
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            ["link", "image"], // Media
          ],
        },
      });

      // Optional: You can save the Quill instance for later use
      quillRef.current.quillInstance = quill;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get the content of the Quill editor
    const quillInstance = quillRef.current?.quillInstance;
    const details = quillInstance?.root.innerHTML;

    if (!details || details.trim() === "<p><br></p>") {
      toast.error("Please provide details about your issue.");
      return;
    }

    toast.success("Your support ticket has been submitted successfully!", {
      duration: 4000, // Toast duration in milliseconds
    });

    // Optionally, handle further form submission logic
    console.log({
      issueTitle: e.target["issue-title"].value,
      issueDetails: details, // Raw HTML content of the Quill editor
    });
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
        {/* Header Section */}
        <div className="flex items-center gap-x-2 mb-4 ml-6">
          <Image
            src="/icons/help-icon.svg"
            width={60}
            height={60}
            alt="help-icon"
          />
          <h3 className="text-[#2F90B0] font-[300] mt-2 uppercase text-[26px]">
            Help
          </h3>
        </div>
        <div className="w-full max-w-lg sm:ml-6 flex flex-col items-start">
          <h1 className="text-[20px] text-center sm:text-left sm:text-[26px] uppercase font-[400] text-gray-800">
            Open a Support Ticket
          </h1>
          <form className="mt-6 space-y-4 w-full" onSubmit={handleSubmit}>
            {/* Issue Title */}
            <div>
              <label
                htmlFor="issue-title"
                className="block text-sm font-medium text-gray-700"
              >
                Issue Title
              </label>
              <input
                type="text"
                id="issue-title"
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:ring-2 transition-all duration-300 ease-in-out focus:outline-none border-gray-300"
                placeholder="Enter issue title"
                required
              />
            </div>

            {/* Issue Details with Quill Editor */}
            <div>
              <label
                htmlFor="issue-details"
                className="block text-sm font-medium text-gray-700"
              >
                Issue Details
              </label>
              <div
                ref={quillRef}
                className="mt-1 block pl-3 w-full text-gray-700 bg-white shadow-sm border border-gray-300 focus:ring-blue-500 focus:outline-none h-[200px]"
              ></div>
            </div>

            {/* File Attachment */}
            <div>
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Attach File
              </label>
              <div className="mt-1 flex">
                <input
                  type="file"
                  id="file-upload"
                  className="block text-sm text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[150px] bg-[#2F90B0] text-white px-4 py-2 rounded-lg hover:bg-[#2F90B0] focus:outline-none focus:ring-2 focus:ring-[#2F90B0]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
