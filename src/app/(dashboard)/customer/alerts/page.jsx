"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertCard from "@/components/AlertCard";
import Select from "@/components/ui/Select";
import Image from "next/image";

const AlertsPage = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const router = useRouter();

  // Filters for dropdowns
  const [filters, setFilters] = useState({
    alertType: "",
    severity: "",
    status: "",
    id: "",
  });

  const alerts = [
    {
      severity: "CRITICAL",
      id: "1",
      date: "TODAY",
      description: "New Open ports detected on example.com",
    },
    {
      severity: "HIGH",
      id: "2",
      date: "YESTERDAY",
      description: "New Open ports detected on example.com",
    },
    {
      severity: "MEDIUM",
      id: "3",
      date: "2 DAYS AGO",
      description: "New Open ports detected on example.com",
    },
    {
      severity: "LOW",
      id: "4",
      date: "3 DAYS AGO",
      description: "New Open ports detected on example.com",
    },
    {
      severity: "HIGH",
      id: "5",
      date: "YESTERDAY",
      description: "New Open ports detected on example.com",
    },
    {
      severity: "MEDIUM",
      id: "6",
      date: "2 DAYS AGO",
      description: "New Open ports detected on example.com",
    },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const alertsPerPage = 6;

  const filteredAlerts = alerts.filter((alert) => {
    const { alertType, severity, status, id } = filters;
    const matchesSeverity = severity
      ? alert.severity.toLowerCase() === severity
      : true;
    const matchesId = id ? alert.id === id : true;
    return matchesSeverity && matchesId;
  });

  // Paginated alerts
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(
    indexOfFirstAlert,
    indexOfLastAlert
  );

  // Handle Pagination
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle dropdown selection changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when a filter changes
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      alertType: "",
      severity: "",
      status: "",
      id: "",
    });
    setCurrentPage(1);
  };

  // Handle card click to navigate to new page
  const handleAlertClick = (id) => {
    router.push(`/customer/alerts/${id}`);
  };

  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      <div>
        <button onClick={() => router.push("/customer/home")} className="mb-3">
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Filters Section */}
          <div className="flex flex-col w-full lg:w-1/4 p-4 ">
            <div className="flex items-center gap-x-2 mb-4">
              <Image
                src="/icons/alerts-image.svg"
                width={60}
                height={60}
                alt="filter-icon"
              />
              <h3 className=" text-[#2F90B0] font-[300] mt-2 uppercase text-[26px]">
                Alerts
              </h3>
            </div>

            <h3 className=" text-black font-[700] text-[22px] my-4">
              Filters and Alerts
            </h3>

            {/* Alert Type Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mb-2">
              Alert Type
            </label>
            <Select
              options={[
                { label: "Vulnerable Service", value: "vulnerable-service" },
                {
                  label: "Report Technical Vulnerability",
                  value: "technical-vulnerability",
                },
                {
                  label: "Report of Botnet Activity",
                  value: "botnet-activity",
                },
                {
                  label: "Vulnerable/Weak Certificate",
                  value: "vulnerable-certificate",
                },
                { label: "Phishing Report", value: "phishing-report" },
                { label: "Phishing Webpage", value: "phishing-webpage" },
                {
                  label: "Misconfigured Web Server",
                  value: "misconfigured-server",
                },
                { label: "Mentioned by Threat Actor", value: "threat-actor" },
                { label: "Leaked Sensitive Data", value: "leaked-data" },
                {
                  label: "Impersonating Sub Domain",
                  value: "impersonating-subdomain",
                },
                {
                  label: "Impersonating Domain",
                  value: "impersonating-domain",
                },
                {
                  label: "Possible Sub Domain Takeover",
                  value: "subdomain-takeover",
                },
                {
                  label: "Impersonating Company Profile",
                  value: "impersonating-profile",
                },
                { label: "Exposed Ports", value: "exposed-ports" },
                {
                  label: "Exposed Sensitive Documents",
                  value: "exposed-documents",
                },
                { label: "Exposed Credentials", value: "exposed-credentials" },
                { label: "Exposed Access Keys", value: "exposed-access-keys" },
                {
                  label: "Association with Malware",
                  value: "association-malware",
                },
                {
                  label: "Evidence of Credential Access",
                  value: "credential-access",
                },
                {
                  label: "Evidence of Initial Access",
                  value: "initial-access",
                },
                {
                  label: "Evidence of Reconnaissance",
                  value: "reconnaissance",
                },
                {
                  label: "Evidence of Resource Development",
                  value: "resource-development",
                },
              ]}
              placeholder="Select Alert Type"
              onSelect={(value) => handleFilterChange("alertType", value)}
              value={filters.alertType}
              className="w-full"
            />
            {/* Severity Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Severity
            </label>
            <Select
              options={[
                { label: "Critical", value: "critical" },
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" },
              ]}
              placeholder="Select Severity"
              onSelect={(value) => handleFilterChange("severity", value)}
              value={filters.severity}
              className="w-full"
            />
            {/* Status Filter */}
            <label className="text-md text-[#2F90B0] mt-6 font-[700] mb-2">
              Status
            </label>
            <Select
              options={[{ label: "Open", value: "open" }]} // Simplified for brevity
              placeholder="Select Status"
              onSelect={(value) => handleFilterChange("status", value)}
              value={filters.status}
              className="w-full"
            />
            {/* ID Filter */}
            <label className="text-md text-[#2F90B0] mt-6 font-[700] mb-2">
              Alert ID
            </label>
            <Select
              options={alerts.map((alert) => ({
                label: alert.id,
                value: alert.id,
              }))}
              placeholder="Select ID"
              onSelect={(value) => handleFilterChange("id", value)}
              value={filters.id}
              className="w-full"
            />
          </div>

          {/* Alerts List Section */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  {...alert}
                  onClick={() => handleAlertClick(alert.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 px-3 py-2 bg-gray-300 rounded"
              >
                {"<"}
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-2 px-3 py-2 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-2 px-3 py-2 bg-gray-300 rounded"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
