"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles
import Select from "@/components/ui/Select";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateIntelligence = () => {
  const router = useRouter();

  const [overview, setOverview] = useState("");
  const [ioc, setIoc] = useState("");

  // States for Select dropdowns
  const [actorType, setActorType] = useState("");
  const [targetSector, setTargetSector] = useState("");
  const [targetLocation, setTargetLocation] = useState("");
  const [tactic, setTactic] = useState("");
  const [technique, setTechnique] = useState("");
  const [subTechnique, setSubTechnique] = useState("");
  const [threatLevel, setThreatLevel] = useState("");
  const [motivations, setMotivations] = useState("");
  const [relatedCve, setRelatedCve] = useState("");
  const [threatActors, setThreatActors] = useState("");

  // Handle form submission
  const handleAdd = () => {
    console.log("Overview Content:", overview);
    console.log("IOC Content:", ioc);

    // Display toast notification
    toast.success("Intelligence added successfully!");

    // Optionally, you can redirect the user or perform other actions here
    // router.push("/reports"); // Uncomment this line if you want to redirect
  };

  const options = {
    actorType: [
      { label: "Actor 1", value: "actor1" },
      { label: "Actor 2", value: "actor2" },
    ],
    targetSector: [
      { label: "Sector 1", value: "sector1" },
      { label: "Sector 2", value: "sector2" },
    ],
    targetLocation: [
      { label: "Location 1", value: "location1" },
      { label: "Location 2", value: "location2" },
    ],
    tactic: [
      { label: "Tactic 1", value: "tactic1" },
      { label: "Tactic 2", value: "tactic2" },
    ],
    technique: [
      { label: "Technique 1", value: "technique1" },
      { label: "Technique 2", value: "technique2" },
    ],
    subTechnique: [
      { label: "Sub Technique 1", value: "subtechnique1" },
      { label: "Sub Technique 2", value: "subtechnique2" },
    ],
    threatLevel: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    motivations: [
      { label: "Motivation 1", value: "motivation1" },
      { label: "Motivation 2", value: "motivation2" },
    ],
    relatedCve: [
      { label: "CVE-1", value: "cve1" },
      { label: "CVE-2", value: "cve2" },
    ],
    threatActors: [
      { label: "Actor 1", value: "actor1" },
      { label: "Actor 2", value: "actor2" },
    ],
  };
  const quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["link"],
    ],
  };
  return (
    <div className="sm:p-10 p-5 bg-white rounded-md text-black">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push("/customer/reports")}
          className="mb-3"
        >
          <Image src="/icons/back.svg" width={40} height={40} alt="back-icon" />
        </button>
        <h3 className="text-[#2F90B0] font-[300] mt-2 uppercase text-[19px] text-center sm:text-left sm:text-[26px] mb-5 ml-5">
          Create your own Intelligence to
        </h3>
      </div>
      {/* Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 sm:gap-5">
        {/* Left Section: Dropdowns */}
        <div className="col-span-1 space-y-4">
          {/* Actor Type */}
          <div>
            <label
              htmlFor="actorType"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Actor Type
            </label>
            <Select
              options={options.actorType}
              placeholder="Select Actor Type"
              onSelect={setActorType}
              className="w-full"
            />
          </div>
          {/* Target Sector */}
          <div>
            <label
              htmlFor="targetSector"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Target Sector
            </label>
            <Select
              options={options.targetSector}
              placeholder="Select Target Sector"
              onSelect={setTargetSector}
              className="w-full"
            />
          </div>
          {/* Target Location */}
          <div>
            <label
              htmlFor="targetLocation"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Target Location
            </label>
            <Select
              options={options.targetLocation}
              placeholder="Select Target Location"
              onSelect={setTargetLocation}
              className="w-full"
            />
          </div>
          {/* Tactic */}
          <div>
            <label
              htmlFor="tactic"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Tactic
            </label>
            <Select
              options={options.tactic}
              placeholder="Select Tactic"
              onSelect={setTactic}
              className="w-full"
            />
          </div>
          {/* Technique */}
          <div>
            <label
              htmlFor="technique"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Technique
            </label>
            <Select
              options={options.technique}
              placeholder="Select Technique"
              onSelect={setTechnique}
              className="w-full"
            />
          </div>
          {/* Sub Technique */}
          <div>
            <label
              htmlFor="subTechnique"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Sub Technique
            </label>
            <Select
              options={options.subTechnique}
              placeholder="Select Sub Technique"
              onSelect={setSubTechnique}
              className="w-full"
            />
          </div>
          {/* Threat Level */}
          <div>
            <label
              htmlFor="threatLevel"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Threat Level
            </label>
            <Select
              options={options.threatLevel}
              placeholder="Select Threat Level"
              onSelect={setThreatLevel}
              className="w-full"
            />
          </div>
          {/* Motivations */}
          <div>
            <label
              htmlFor="motivations"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Motivations
            </label>
            <Select
              options={options.motivations}
              placeholder="Select Motivations"
              onSelect={setMotivations}
              className="w-full"
            />
          </div>
          {/* Related CVEs */}
          <div>
            <label
              htmlFor="relatedCve"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Related CVEs
            </label>
            <Select
              options={options.relatedCve}
              placeholder="Select Related CVEs"
              onSelect={setRelatedCve}
              className="w-full"
            />
          </div>
          {/* Threat Actors */}
          <div>
            <label
              htmlFor="threatActors"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Threat Actors
            </label>
            <Select
              options={options.threatActors}
              placeholder="Select Threat Actors"
              onSelect={setThreatActors}
              className="w-full"
            />
          </div>
        </div>

        {/* Right Section: Editor */}
        <div className="col-span-2 space-y-4">
          {/* Overview */}
          <div>
            <h4 className="font-bold text-[#2F90B0] text-[22px] mb-2">
              Add Overview
            </h4>
            <ReactQuill
              value={overview}
              onChange={setOverview}
              modules={quillModules}
              placeholder="Enter overview..."
            />
          </div>

          {/* IOC */}
          <div>
            <h4 className="font-bold text-[#2F90B0] text-[22px] mb-2">
              Add Indicators
            </h4>
            <ReactQuill
              value={ioc}
              onChange={setIoc}
              modules={quillModules}
              placeholder="Enter IOC's..."
            />
          </div>

          {/* Submit Button */}

          <div className="w-full flex justify-end">
            <button
              onClick={handleAdd}
              className="mt-4 px-4 py-2 text-white bg-[#2F90B0] rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toaster />
    </div>
  );
};

export default CreateIntelligence;
