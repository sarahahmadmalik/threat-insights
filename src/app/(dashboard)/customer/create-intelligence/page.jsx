"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Select from "@/components/ui/Select";
import toast, { Toaster } from "react-hot-toast"; // Import toast
import dynamic from "next/dynamic";

// Dynamically import Quill with { ssr: false } to disable server-side rendering
const Quill = dynamic(() => import("quill"), { ssr: false });
import "quill/dist/quill.snow.css";

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

  const overviewEditorRef = useRef(null);
  const iocEditorRef = useRef(null);

  // Initialize Quill editor instances
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Quill only in the client-side environment
      const overviewEditor = new Quill(overviewEditorRef.current, {
        theme: "snow",
        placeholder: "Enter overview...",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            ["link"],
          ],
        },
      });

      overviewEditor.on("text-change", () => {
        setOverview(overviewEditor.root.innerHTML); // Update the state with HTML content
      });

      const iocEditor = new Quill(iocEditorRef.current, {
        theme: "snow",
        placeholder: "Enter IOC's...",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            ["link"],
          ],
        },
      });

      iocEditor.on("text-change", () => {
        setIoc(iocEditor.root.innerHTML); // Update the state with HTML content
      });
    }
  }, []);

  // Handle form submission
  const handleAdd = () => {
    console.log("Overview Content:", overview);
    console.log("IOC Content:", ioc);

    // Display toast notification
    toast.success("Intelligence added successfully!");

    // Optionally, you can redirect the user or perform other actions here
    // router.push("/reports"); // Uncomment this line if you want to redirect
  };

  // Dropdown options
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

          {/* Related CVE */}
          <div>
            <label
              htmlFor="relatedCve"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Related CVE
            </label>
            <Select
              options={options.relatedCve}
              placeholder="Select Related CVE"
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

        {/* Right Section: Text Editors */}
        <div className="col-span-2">
          {/* Overview Editor */}
          <div className="space-y-4">
            <label
              htmlFor="overview"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              Overview
            </label>
            <div ref={overviewEditorRef} className="border p-2"></div>
          </div>

          {/* IOC Editor */}
          <div className="space-y-4">
            <label
              htmlFor="ioc"
              className="text-md text-[#2F90B0] mb-4 font-semibold"
            >
              IOCs
            </label>
            <div ref={iocEditorRef} className="border p-2"></div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAdd}
          className="bg-[#2F90B0] text-white py-2 px-4 rounded-md"
        >
          Save Intelligence
        </button>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default CreateIntelligence;
