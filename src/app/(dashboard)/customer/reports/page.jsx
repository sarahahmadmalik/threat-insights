"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Reports = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Download Alert Data",
      icon: "/icons/download.svg",
      buttons: [
        { label: "CSV", color: "bg-[#2F90B0]", link: "/customer/download/csv" },
        { label: "PDF", color: "bg-[#2F90B0]", link: "/customer/download/pdf" },
      ],
    },
    {
      title: "Setup Scheduled Reports",
      icon: "/icons/report.svg",
      buttons: [
        {
          label: "SETUP",
          color: "bg-[#2F90B0]",
          link: "/customer/reports/schedule",
        },
      ],
    },
    {
      title: "Create your own Intelligence to share",
      icon: "/icons/intel.svg",
      buttons: [
        {
          label: "CREATE",
          color: "bg-[#2F90B0]",
          link: "/customer/create-intelligence",
        },
      ],
    },
    {
      title: "Request Intelligence Services",
      icon: "/icons/request.svg",
      buttons: [
        {
          label: "REQUEST",
          color: "bg-[#2F90B0]",
          link: "/customer/request-intelligence",
        },
      ],
    },
  ];

  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      {/* Header */}
      <div>
        <button onClick={() => router.push("/customer/home")} className="mb-3">
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
        <div className="flex items-center gap-x-2 mb-7 ml-7">
          <Image src="/report.svg" width={60} height={60} alt="filter-icon" />
          <h3 className=" text-[#2F90B0] font-[300] mt-2 uppercase text-[26px]">
            Reports
          </h3>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6 w-full max-w-4xl">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border-2 border-[#2F90B0]"
            >
              {/* Title */}
              <h2 className="text-xl font-[400] text-gray-800 mb-4 text-center">
                {card.title}
              </h2>

              {/* Icon */}
              <div className="relative flex justify-center items-center mb-2 w-24 h-24 sm:w-40 sm:h-40">
                <Image
                  src={card.icon}
                  alt={card.title}
                  layout="intrinsic"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              </div>

              {/* Buttons */}
              <div
                className={`w-full mt-4 gap-2 ${
                  card.buttons.length > 1
                    ? "flex justify-between"
                    : "flex justify-end"
                }`}
              >
                {card.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className={`${button.color} text-white w-[100px] px-4 py-2 rounded shadow`}
                    onClick={() => router.push(button.link)} // Navigate to the button's link
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
