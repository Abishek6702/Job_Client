import React, { useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { Plus, X } from "lucide-react";

const LOCATION_OPTIONS = [
  "Coimbatore", "Madurai", "Chennai", "Pollachi", "Cuddalore", "Dharmapuri",
  "Dindigul", "Erode", "Kallakurichi", "Karur", "Nagapattinam",
  "Los Angeles", "Salem", "Thanjavur", "Bangalore","Tiruppur"
];

export default function ExperienceStep({ formData, setFormData, errors }) {
  const [showModal, setShowModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState({}); // per index suggestions

  const handleArrayChange = (idx, e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const arr = [...prev.experience];

      if (name === "present") {
        arr[idx].present = checked;

        const today = new Date();
        const formatted = today.toISOString().split("T")[0]; // YYYY-MM-DD

        if (checked) {
          arr[idx].yearTo = formatted; // auto set yearTo to today's date
        } else {
          arr[idx].yearTo = "";
        }
      } else {
        arr[idx][name] = value;
      }

      return { ...prev, experience: arr };
    });
  };

  const handleLocationChange = (idx, e) => {
    const val = e.target.value;
    handleArrayChange(idx, e);

    // Show filtered location suggestions
    setShowSuggestions((prev) => ({
      ...prev,
      [idx]: val
        ? LOCATION_OPTIONS.filter((loc) =>
            loc.toLowerCase().includes(val.toLowerCase())
          )
        : LOCATION_OPTIONS,
    }));
  };

  const handleSuggestionClick = (idx, loc) => {
    setFormData((prev) => {
      const arr = [...prev.experience];
      arr[idx].location = loc;
      return { ...prev, experience: arr };
    });
    setShowSuggestions((prev) => ({
      ...prev,
      [idx]: [],
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          title: "",
          location: "",
          yearFrom: "",
          yearTo: "",
          present: false,
          description: "",
        },
      ],
    }));
  };

  const handleDeleteClick = (idx) => {
    setDeleteIdx(idx);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setFormData((prev) => {
      const arr = [...prev.experience];
      arr.splice(deleteIdx, 1);
      return { ...prev, experience: arr };
    });
    setShowModal(false);
    setDeleteIdx(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteIdx(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Experience</h2>
      <div className="flex items-center justify-between">
        <p className="mb-4 text-gray-700">Add your work experience</p>
        <button
          type="button"
          onClick={addItem}
          className="flex items-center text-white font-semibold mb-2 bg-blue-500 p-1 rounded-lg px-2"
        >
          <Plus className="w-5" /> Add Experience
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        {formData.experience.map((exp, idx) => (
          <div
            key={idx}
            className="relative p-4 mb-6 rounded border-gray-200 bg-white"
          >
            {formData.experience.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteClick(idx)}
                className="absolute right-2 top-2 text-red-500"
              >
                <X />
              </button>
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* Company */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  name="company"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleArrayChange(idx, e)}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {errors?.company && (
                  <p className="text-red-500 text-sm">{errors.company}</p>
                )}
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => handleArrayChange(idx, e)}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {errors?.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>

              {/* Location with suggestions */}
              <div className="flex flex-col gap-1 relative">
                <label className="font-bold">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => handleLocationChange(idx, e)}
                  onFocus={() =>
                    setShowSuggestions((prev) => ({
                      ...prev,
                      [idx]: LOCATION_OPTIONS,
                    }))
                  }
                  onBlur={() =>
                    setTimeout(
                      () =>
                        setShowSuggestions((prev) => ({
                          ...prev,
                          [idx]: [],
                        })),
                      150
                    )
                  }
                  autoComplete="off"
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {showSuggestions[idx] && showSuggestions[idx].length > 0 && (
                  <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-auto">
                    {showSuggestions[idx].map((loc) => (
                      <li
                        key={loc}
                        onMouseDown={() => handleSuggestionClick(idx, loc)}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}
                {errors?.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
              {/* Year From */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">
                  Year From <span className="text-red-500">*</span>
                </label>
                <input
                  name="yearFrom"
                  type="date"
                  value={exp.yearFrom}
                  onChange={(e) => handleArrayChange(idx, e)}
                  // REMOVED: disabled={exp.present}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {errors?.yearFrom && (
                  <p className="text-red-500 text-sm">{errors.yearFrom}</p>
                )}
              </div>

              {/* Year To */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">
                  Year To <span className="text-red-500">*</span>
                </label>
                <input
                  name="yearTo"
                  type="date"
                  value={exp.yearTo}
                  onChange={(e) => handleArrayChange(idx, e)}
                  disabled={exp.present} // keep this, so Year To can't be edited when Present
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {errors?.yearTo && (
                  <p className="text-red-500 text-sm">{errors.yearTo}</p>
                )}
              </div>

              {/* Present checkbox */}
              <div className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  name="present"
                  checked={exp.present || false}
                  onChange={(e) => handleArrayChange(idx, e)}
                />
                <label>Present</label>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1 col-span-2">
                <label className="font-bold">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleArrayChange(idx, e)}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {/* {errors?.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ConfirmModal
          title="Delete Experience Entry"
          message="Are you sure you want to delete this experience entry? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmLabel="Delete"
        />
      )}
    </div>
  );
}