"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import IntelligenceCard from "@/components/IntelligenceCard";
import Select from "@/components/ui/Select";
import Image from "next/image";

const IntelligencePage = () => {
  const [selectedIntelligence, setSelectedIntelligence] = useState(null);
  const router = useRouter();

  // Filters for dropdowns
  const [filters, setFilters] = useState({
    actorType: "",
    targetSector: "",
    finance: "",
    targetLocation: "",
    tactic: "",
    technique: "",
    subTechnique: "",
    threatLevel: "",
  });

  const intelligenceData = [
    {
      actorType: "APT28",
      targetSector: "Finance",
      finance: "Cryptocurrency",
      targetLocation: "US",
      tactic: "Initial Access",
      technique: "Spearphishing",
      subTechnique: "Spearphishing Attachment",
      threatLevel: "Critical",
      id: "1",
      date: "03 Oct 2024",
      title: "Russia-Ukraine War",
      description:
        "On 24th February 2022, Russian military forces conducted a military operation against Ukraine. This reportedly surfaced due to perceived NATO expasions in Eastern Europe…..",
    },
    {
      actorType: "APT29",
      targetSector: "Healthcare",
      finance: "Banking",
      targetLocation: "Europe",
      tactic: "Persistence",
      technique: "Web Shell",
      subTechnique: "HTTPS",
      threatLevel: "High",
      id: "2",
      date: "03 Oct 2024",
      title: "Russia-Ukraine War",
      description:
        "On 24th February 2022, Russian military forces conducted a military operation against Ukraine. This reportedly surfaced due to perceived NATO expasions in Eastern Europe…..",
    },
    {
      actorType: "APT33",
      targetSector: "Energy",
      finance: "Stock Market",
      targetLocation: "Asia",
      tactic: "Command and Control",
      technique: "DNS Tunneling",
      subTechnique: "None",
      threatLevel: "Medium",
      id: "3",
      date: "03 Oct 2024",
      title: "Russia-Ukraine War",
      description:
        "On 24th February 2022, Russian military forces conducted a military operation against Ukraine. This reportedly surfaced due to perceived NATO expasions in Eastern Europe…..",
    },
    {
      actorType: "APT34",
      targetSector: "Telecom",
      finance: "Insurance",
      targetLocation: "Africa",
      tactic: "Exfiltration",
      technique: "Exfiltration Over Command and Control Channel",
      subTechnique: "None",
      threatLevel: "Low",
      id: "4",
      date: "03 Oct 2024",
      title: "Russia-Ukraine War",
      description:
        "On 24th February 2022, Russian military forces conducted a military operation against Ukraine. This reportedly surfaced due to perceived NATO expasions in Eastern Europe…..",
    },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const intelligencePerPage = 6;

  const filteredIntelligence = intelligenceData.filter((intel) => {
    const {
      actorType,
      targetSector,
      finance,
      targetLocation,
      tactic,
      technique,
      subTechnique,
      threatLevel,
    } = filters;

    const matchesActorType = actorType
      ? intel.actorType.toLowerCase() === actorType
      : true;
    const matchesTargetSector = targetSector
      ? intel.targetSector.toLowerCase() === targetSector
      : true;
    const matchesFinance = finance
      ? intel.finance.toLowerCase() === finance
      : true;
    const matchesTargetLocation = targetLocation
      ? intel.targetLocation.toLowerCase() === targetLocation
      : true;
    const matchesTactic = tactic ? intel.tactic.toLowerCase() === tactic : true;
    const matchesTechnique = technique
      ? intel.technique.toLowerCase() === technique
      : true;
    const matchesSubTechnique = subTechnique
      ? intel.subTechnique.toLowerCase() === subTechnique
      : true;
    const matchesThreatLevel = threatLevel
      ? intel.threatLevel.toLowerCase() === threatLevel
      : true;

    return (
      matchesActorType &&
      matchesTargetSector &&
      matchesFinance &&
      matchesTargetLocation &&
      matchesTactic &&
      matchesTechnique &&
      matchesSubTechnique &&
      matchesThreatLevel
    );
  });

  // Paginated intelligence
  const indexOfLastIntel = currentPage * intelligencePerPage;
  const indexOfFirstIntel = indexOfLastIntel - intelligencePerPage;
  const currentIntelligence = filteredIntelligence.slice(
    indexOfFirstIntel,
    indexOfLastIntel
  );

  // Handle Pagination
  const totalPages = Math.ceil(
    filteredIntelligence.length / intelligencePerPage
  );

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
      actorType: "",
      targetSector: "",
      finance: "",
      targetLocation: "",
      tactic: "",
      technique: "",
      subTechnique: "",
      threatLevel: "",
    });
    setCurrentPage(1);
  };

  // Handle card click to navigate to new page
  const handleIntelligenceClick = (id) => {
    router.push(`/customer/intelligence/${id}`);
  };

  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      <div>
        <button onClick={() => router.push("/customer/home")} className="mb-3">
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Filters Section */}
          <div className="flex flex-col  w-full  p-4 ">
            <div className="flex items-center gap-x-2 mb-7">
              <Image
                src="/icons/intelligence-pic.svg"
                width={60}
                height={60}
                alt="filter-icon"
              />
              <h3 className=" text-[#2F90B0] font-[300] mt-2 uppercase text-[26px]">
                Intelligence
              </h3>
            </div>

            {/* Actor Type Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mb-2">
              Actor Type
            </label>
            <Select
              options={[
                { label: "APT28", value: "apt28" },
                { label: "APT29", value: "apt29" },
                { label: "APT33", value: "apt33" },
                { label: "APT34", value: "apt34" },
              ]}
              placeholder="Select Actor Type"
              onSelect={(value) => handleFilterChange("actorType", value)}
              value={filters.actorType}
              className="w-full"
            />
            {/* Target Sector Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Target Sector
            </label>
            <Select
              options={[
                { label: "Finance", value: "finance" },
                { label: "Healthcare", value: "healthcare" },
                { label: "Energy", value: "energy" },
                { label: "Telecom", value: "telecom" },
              ]}
              placeholder="Select Target Sector"
              onSelect={(value) => handleFilterChange("targetSector", value)}
              value={filters.targetSector}
              className="w-full"
            />
            {/* Finance Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Finance
            </label>
            <Select
              options={[
                { label: "Cryptocurrency", value: "cryptocurrency" },
                { label: "Banking", value: "banking" },
                { label: "Stock Market", value: "stock-market" },
                { label: "Insurance", value: "insurance" },
              ]}
              placeholder="Select Finance"
              onSelect={(value) => handleFilterChange("finance", value)}
              value={filters.finance}
              className="w-full"
            />
            {/* Target Location Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Target Location
            </label>
            <Select
              options={[
                { label: "US", value: "us" },
                { label: "Europe", value: "europe" },
                { label: "Asia", value: "asia" },
                { label: "Africa", value: "africa" },
              ]}
              placeholder="Select Target Location"
              onSelect={(value) => handleFilterChange("targetLocation", value)}
              value={filters.targetLocation}
              className="w-full"
            />
            {/* Tactic Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Tactic
            </label>
            <Select
              options={[
                { label: "Initial Access", value: "initial-access" },
                { label: "Persistence", value: "persistence" },
                { label: "Exfiltration", value: "exfiltration" },
              ]}
              placeholder="Select Tactic"
              onSelect={(value) => handleFilterChange("tactic", value)}
              value={filters.tactic}
              className="w-full"
            />
            {/* Technique Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Technique
            </label>
            <Select
              options={[
                { label: "Spearphishing", value: "spearphishing" },
                { label: "Web Shell", value: "web-shell" },
                { label: "DNS Tunneling", value: "dns-tunneling" },
              ]}
              placeholder="Select Technique"
              onSelect={(value) => handleFilterChange("technique", value)}
              value={filters.technique}
              className="w-full"
            />
            {/* Sub Technique Filter */}
            <label className="text-md text-[#2F90B0] font-[700] mt-6 mb-2">
              Sub Technique
            </label>
            <Select
              options={[
                {
                  label: "Spearphishing Attachment",
                  value: "spearphishing-attachment",
                },
                { label: "HTTPS", value: "https" },
              ]}
              placeholder="Select Sub Technique"
              onSelect={(value) => handleFilterChange("subTechnique", value)}
              value={filters.subTechnique}
              className="w-full"
            />
          </div>

          <div className="">
            {/* Intelligence Data Section */}
            <div className="flex gap-5 flex-wrap p-4">
              {currentIntelligence.map((intel) => (
                <IntelligenceCard
                  key={intel.id}
                  id={intel.id}
                  date={intel.date}
                  description={intel.description}
                  category={intel.threatLevel}
                  title={intel.title}
                  onClick={() => handleIntelligenceClick(intel.id)}
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

export default IntelligencePage;
