import { useState } from "react";
import Image from "next/image";
import LoadingDots from "../ui/LoadingDots";

function AddDropdownPopup({ isOpen, onClose, onSave, loading }) {
  const [dropdownData, setDropdownData] = useState({
    title: "",
    options: [""],
  });

  const [errors, setErrors] = useState({
    title: "",
    options: [],
  });

    const handleSave = () => {
    // Validate title and options
    const newErrors = { title: "", options: [] };

    // Title validation: not empty, not too short
    if (!dropdownData.title.trim()) {
      newErrors.title = "Title cannot be empty.";
    } else if (dropdownData.title.length < 2) {
      newErrors.title = "Title should be at least 2 characters long.";
    }

    // Options validation: at least one option must be non-empty
    const nonEmptyOptions = dropdownData.options.filter(
      (option) => option.trim() !== ""
    );
    if (nonEmptyOptions.length === 0) {
      newErrors.options = ["At least one option is required."];
    } else {
      dropdownData.options.forEach((option, index) => {
        if (!option.trim()) {
          newErrors.options[index] = "Option cannot be empty or just spaces.";
        }
      });
    }

    if (newErrors.title || newErrors.options.some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    onSave(dropdownData);
    // onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 overflow-auto min-h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white py-8 px-6 rounded-[15px] w-[460px] max-w-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="w-full mt-6">
              <h2 className="text-lg sm:text-[22px] font-[700] text-center text-[#1E1E1E]">
                Create Dropdown
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl flex items-center justify-center border-2 border-red-500 rounded-full px-2 w-[30px] h-[30px] text-red-500 mb-10"
            >
              <p className="mt-[-2px]">&times;</p>
            </button>
          </div>

          {/* Title Input */}
          <div className="px-3">
            <input
              type="text"
              value={dropdownData.title}
              onChange={(e) =>
                setDropdownData({ ...dropdownData, title: e.target.value })
              }
              placeholder="Enter Title"
              className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <ul className="my-4 max-h-[200px] overflow-y-auto px-3 pt-2">
            {/* Options Inputs */}
            {dropdownData.options.map((option, index) => (
              <div key={index} className="flex items-start gap-x-2 mb-2">
                <div className="w-full">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...dropdownData.options];
                      updatedOptions[index] = e.target.value;
                      setDropdownData({
                        ...dropdownData,
                        options: updatedOptions,
                      });
                    }}
                    placeholder={`Option ${index + 1}`}
                    className={`w-full px-4 py-3 rounded-md text-slate-800 focus:outline-none border focus:ring-2 ${
                      errors.options[index]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-500"
                    }`}
                  />
                  {errors.options[index] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.options[index]}
                    </p>
                  )}
                </div>
                {index > 0 ? (
                  <button
                    onClick={() => {
                      const updatedOptions = dropdownData.options.filter(
                        (_, i) => i !== index
                      );
                      setDropdownData({
                        ...dropdownData,
                        options: updatedOptions,
                      });
                    }}
                    className="bg-red-500 text-white px-4 py-3 rounded-md"
                  >
                    Delete
                  </button>
                ) : (
                  /* Add Option Button */
                  <button
                    onClick={() =>
                      setDropdownData({
                        ...dropdownData,
                        options: [...dropdownData.options, ""],
                      })
                    }
                    className="bg-green-500 flex gap-x-2 w-[90px] items-center justify-center text-white px-4 py-3 rounded-md"
                  >
                    <p>Add</p>
                    <Image
                      src="/icons/add.svg"
                      alt="Add"
                      width={10}
                      height={10}
                    />
                  </button>
                )}
              </div>
            ))}
          </ul>

          <div className="w-full justify-center">
            <button
              onClick={handleSave}
              className="w-full py-2 bg-[#2F90B0] hover:bg-[#1f6780] text-white rounded-lg mt-4"
            >
              <div className="flex w-full justify-center items-center gap-2">
                <p>Add</p>
                {loading ? <LoadingDots /> : ""}
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default AddDropdownPopup;
