"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

function CVE() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (
      uploadedFile &&
      ["text/csv", "application/vnd.ms-excel"].includes(uploadedFile.type)
    ) {
      setFile(uploadedFile);
      alert(`File uploaded: ${uploadedFile.name}`);
    } else {
      alert("Please upload a valid CSV or Excel file.");
    }
  };

  const handleFetchFromRepository = () => {
    alert("Fetching CVE data from repository...");
    // Add logic to fetch CVE data here
  };

  return (
    <AdminLayout>
      <div className="px-3 min-h-[400px]">
        <h1 className="text-2xl font-bold mb-6">Update CVE Database</h1>
        <div className="flex flex-col sm:flex-row space-y-5 sm:space-x-4">
          {/* Upload CVE Database Button */}
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="bg-[#2f90b0] text-white px-4 py-2 rounded-md shadow transition-colors hover:bg-[#21718b]"
          >
            Upload CVE Database
          </button>
          <input
            id="fileInput"
            type="file"
            accept=".csv, .xlsx"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Fetch from Repository Button */}
          <button
            onClick={handleFetchFromRepository}
            className="bg-slate-600 transition-colors text-white px-4 py-2 rounded-md shadow hover:bg-slate-700"
          >
            Fetch from Repository
          </button>
        </div>

        {/* File Details */}
        {file && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow">
            <p className="text-gray-700">
              <strong>Uploaded File:</strong> {file.name}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default CVE;
