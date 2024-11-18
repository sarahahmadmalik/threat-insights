"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Select = ({ options, placeholder, onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  return (
    <div className={cn(`relative w-48 ${className}`)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border px-4 py-2 text-left bg-white rounded shadow-sm focus:outline-none flex items-center justify-between"
      >
        {selected || placeholder}
        <Image
          src={"/icons/dropdown.svg"}
          alt="Dropdown Icon"
          width={16}
          height={16}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full border bg-white rounded shadow-md mt-1 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
