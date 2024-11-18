"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AlertDetails = () => {
  const router = useRouter();
  const [comments, setComments] = useState([
    {
      user: "ThreatInsight",
      text: "Do not expose these types of ports to the internet.",
    },
    { user: "Customer", text: "Thank you, we will resolve this issue." },
  ]);

  const [newComment, setNewComment] = useState("");
  const alertData = {
    id: 1,
    severity: "CRITICAL", // Options: "CRITICAL", "HIGH", "MEDIUM", "LOW"
    date: "01/01/2024",
    mitreId: "T001234",
    description: "New Open ports detected on example.com",
    ports: [3389, 1143],
  };

  const severityColors = {
    CRITICAL: "border-purple-500 bg-purple-500",
    HIGH: "border-red-500 bg-red-500",
    MEDIUM: "border-yellow-500 bg-yellow-500",
    LOW: "border-green-500 bg-green-500",
  };

  const severityTextColors = {
    CRITICAL: "text-purple-500",
    HIGH: "text-red-500",
    MEDIUM: "text-yellow-500",
    LOW: "text-green-500",
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { user: "Customer", text: newComment }]);
    setNewComment("");
  };

  const handleResolve = () => {
    toast.success("Alert resolved successfully!", {
      duration: 3000,
      position: "top-center",
    });
  };

  return (
    <div className="p-6 sm:p-10 bg-white rounded-md text-black shadow-lg">
      <Toaster />
      <button onClick={() => router.back()} className="mb-6">
        <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
      </button>
      <div className="p-6 border rounded bg-white shadow-lg">
        {/* Alert Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <span
              className={`w-4 h-4 rounded-full border-2 ${
                severityColors[alertData.severity] || "border-gray-500"
              }`}
            ></span>
            <h2
              className={`text-lg font-bold ${
                severityTextColors[alertData.severity]
              }`}
            >
              {alertData.severity} Alert
            </h2>
          </div>
          <div className="text-right w-full sm:w-auto flex flex-col items-end sm:block text-sm text-gray-500 mt-2 sm:mt-0">
            <p>ID: {alertData.id}</p>
            <p>Date: {alertData.date}</p>
            <p>MITRE ID: {alertData.mitreId}</p>
          </div>
        </div>

        {/* Issue Description */}
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase text-gray-700">Issue</h3>
          <p className="text-sm text-gray-600">{alertData.description}</p>
          <p className="text-sm text-gray-600 mt-4">
            <strong>TCP PORTS:</strong> {alertData.ports.join(", ")}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase text-gray-700 mb-4">
            Comments
          </h3>
          <div className="border rounded p-4 bg-gray-50">
            {comments.map((comment, index) => (
              <p key={index} className="text-sm text-gray-700 mb-2">
                <span className="font-bold">{comment.user} says:</span>{" "}
                {comment.text}
              </p>
            ))}
          </div>

          {/* New Comment Input */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-blue-500 text-black focus:outline-none transition-all duration-300 ease-in-out"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 sm:mt-0"
            >
              Comment
            </button>
          </div>
        </div>

        {/* Resolve Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleResolve}
            className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
          >
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
