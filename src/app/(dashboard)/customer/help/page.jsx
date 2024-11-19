"use client";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to ensure it only renders on the client-side
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function SupportTicket() {
  const router = useRouter();
  const [issueDetails, setIssueDetails] = useState(""); // State for Quill editor content
  const [issueTitle, setIssueTitle] = useState(""); // State for issue title

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!issueDetails || issueDetails.trim() === "<p><br></p>") {
      toast.error("Please provide details about your issue.");
      return;
    }

    toast.success("Your support ticket has been submitted successfully!", {
      duration: 4000,
    });

    console.log({
      issueTitle: issueTitle.trim(),
      issueDetails,
    });
  };

  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <button onClick={() => router.push("/customer/home")} className="mb-3">
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
      </div>

      <div className="w-full flex sm:items-start flex-col sm:flex-row sm:gap-x-5 justify-start">
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
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="issue-details"
                className="block text-sm font-medium text-gray-700"
              >
                Issue Details
              </label>
              <ReactQuill
                value={issueDetails}
                onChange={setIssueDetails}
                className="mt-1 bg-white shadow-sm border border-gray-300"
                placeholder="Enter issue details"
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                  ],
                }}
                theme="snow"
              />
            </div>

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
