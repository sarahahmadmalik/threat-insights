"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

const data = {
  summary: [
    "On 24th February 2022, Russian military forces conducted a military operation against Ukraine. Thisreportedly surfaced due to perceived NATO expasions in Eastern Europe, On 24th reportedly surfaced due to perceived NATO expasions in Eastern Europe, On 24 military forces conducted a military operation against Ukraine. This reportedly surfaced due to perceived NATO expasions in Eastern Europe",
  ],
  topTargetedIndustries: ["Government", "Media", "Industrial Goods & Services"],
  associations: ["Anonymous", "Turk Hack Team", "APT28"],
  category: "CRITICAL",
};

export default function Home() {
    const router = useRouter();
    
  const categoryColors = {
    CRITICAL: "border-[#D8CBFD]",
    HIGH: "border-[#F4B1B1]",
    MEDIUM: "border-[#F0D88F]",
    LOW: "border-[#BBEEA9]",
  };

  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      <button onClick={() => router.push("/customer/home")} className="mb-3">
        <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
      </button>
      <div className="flex items-center gap-x-2 mb-7 ml-7">
        <Image
          src="/icons/intelligence-pic.svg"
          width={60}
          height={60}
          alt="filter-icon"
        />
        <h3 className=" text-[#2F90B0] font-[300] mt-2 uppercase text-[18px] sm:text-[26px]">
          Intelligence
        </h3>
      </div>
      <div
        className={`max-w-4xl mx-auto bg-white rounded-lg p-6 border-l-8 ${
          categoryColors[data.category.toUpperCase()]
        }`}
        style={{ boxShadow: "1px -2px 16.1px 0px #2F90B04D" }}
      >
        <h1 className="text-2xl font-bold mb-4">Russia-Ukraine War</h1>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          {data.summary.map((line, index) => (
            <p key={index} className="text-gray-700 mb-1">
              {line}
            </p>
          ))}
        </section>

        {/* Top Targeted Industries */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Top Targeted Industries
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            {data.topTargetedIndustries.map((industry, index) => (
              <li key={index}>{industry}</li>
            ))}
          </ul>
        </section>

        {/* Top Targeted Locations */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Top Targeted Locations</h2>
          <p className="text-gray-700">
            Would be great if this could be a map? Otherwise listed locations
            are OK.
          </p>
        </section>

        {/* Mitre Attack Matrix */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Mitre Attack Matrix</h2>
          <div className="overflow-x-scroll border rounded-lg p-2 bg-gray-50">
            <Image
              src="/matrix.svg"
              alt="Mitre Attack Matrix"
              width={800}
              height={400}
              className="object-contain"
            />
          </div>
        </section>

        {/* Associations */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Associations</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {data.associations.map((association, index) => (
              <li key={index}>{association}</li>
            ))}
          </ul>
        </section>

        {/* Action Buttons */}
        <div className="flex w-full justify-end gap-4">
          <button className="bg-[#2F90B0] text-white w-[130px] px-4 py-2 rounded shadow">
            PDF
          </button>
          <button className="bg-[#2F90B0] text-white w-[130px] px-4 py-2 rounded shadow">
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}
