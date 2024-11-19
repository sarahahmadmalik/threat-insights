"use client";

import { useState } from "react";
import Image from "next/image";
import Select from "@/components/ui/Select";
import { useRouter } from "next/navigation";

const ConfigurePage = () => {
  const industryOptions = [
    { label: "Real Estate", value: "real_estate" },
    { label: "Finance", value: "finance" },
    { label: "Healthcare", value: "healthcare" },
  ];

  const [industries, setIndustries] = useState([]);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [domain, setDomain] = useState("");
  const [domains, setDomains] = useState([]);
  const [ip, setIP] = useState("");
  const [ips, setIPs] = useState([]);
  const router = useRouter();

  const handleAddIndustry = (value) => {
    if (!industries.includes(value)) {
      setIndustries((prev) => [...prev, value]);
    }
  };

  const handleAddLocation = () => {
    if (location.trim() && !locations.includes(location)) {
      setLocations((prev) => [...prev, location]);
      setLocation("");
    }
  };

  const handleAddEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email) && !emails.includes(email)) {
      setEmails((prev) => [...prev, email]);
      setEmail("");
    }
  };

  const handleAddDomain = () => {
    if (domain.trim() && !domains.includes(domain)) {
      setDomains((prev) => [...prev, domain]);
      setDomain("");
    }
  };

  const handleAddIP = () => {
    const ipPattern =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    if (ipPattern.test(ip) && !ips.includes(ip)) {
      setIPs((prev) => [...prev, ip]);
      setIP("");
    }
  };

  const handleRemove = (list, setList, item) => {
    setList(list.filter((i) => i !== item));
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-5 sm:p-10">
      {/* Back Button */}
      <button
        className="mb-6 self-start"
        onClick={() => router.push("/customer/home")}
      >
        <Image src="/icons/back.svg" alt="Back" width={40} height={40} />
      </button>

      {/* Header */}
      <div className="w-full flex mx-4 justify-start mb-8">
        <div className="flex items-center uppercase justify-center gap-2 text-[#2F90B0] text-2xl font-[300]">
          <Image
            src="/icons/config.svg"
            alt="Gear Icon"
            width={60}
            height={60}
          />
          Configure
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* General Options */}
        <div>
          <h2 className="text-center uppercase text-[22px] font-[300] mb-6">
            GENERAL OPTIONS
          </h2>
          <div className="space-y-6">
            {/* Industry Sector */}
            <div>
              <label className="text-[#2F90B0] font-semibold block mb-2">
                Industry Sector
              </label>
              <div className="flex items-center gap-4">
                <Select
                  options={industryOptions}
                  placeholder="Select Industry"
                  onSelect={handleAddIndustry}
                  className="w-full"
                />
              </div>
              {industries.length > 0 && (
                <ul className="mt-2 text-gray-700">
                  {industries.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {item}
                      <button
                        onClick={() =>
                          handleRemove(industries, setIndustries, item)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="text-[#2F90B0] font-semibold block mb-2">
                Location
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Europe"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 transition-all duration-300 border-gray-300 border focus:ring-2 focus:ring-[#2F90B0] rounded-md"
                />
                <button
                  onClick={handleAddLocation}
                  className="bg-[#2F90B0] text-white px-4 py-2 rounded"
                >
                  ADD
                </button>
              </div>
              {locations.length > 0 && (
                <ul className="mt-2 text-gray-700">
                  {locations.map((loc, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {loc}
                      <button
                        onClick={() =>
                          handleRemove(locations, setLocations, loc)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Assets */}
        <div>
          {/* Additional sections for email, domains, IPs */}
        </div>
      </div>
    </div>
  );
};

export default ConfigurePage;
