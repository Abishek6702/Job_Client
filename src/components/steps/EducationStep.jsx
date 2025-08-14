import { X } from "lucide-react";
import React, { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const LEVEL_OPTIONS = [
  "High School", "Diploma", "Bachelors", "Masters",
  "PhD", "Post Doctorate", "Associate Degree", "Certificate",
  "Professional Degree", "Technical Diploma", "Foundation", 
  "GCSE", "IB Diploma", "ALevel", "Vocational"
];

const INSTITUTION_OPTIONS = [
  "Anna University", "University of Madras", "Tamil University",
  "Bharathiar University", "Periyar University", "Madurai Kamaraj University",
  "Annamalai University", "Manonmaniam Sundaranar University",
  "Mother Teresa Women's University", "Tamil Nadu Agricultural University",
  "TN Dr. M.G.R. Medical University", "Tamil Nadu Open University",
  "Tamil Nadu Teachers Education University", "Thiruvalluvar University",
  "Central University of Tamil Nadu", "Amrita Vishwa Vidyapeetham",
  "B.S. Abdur Rahman University", "Karunya University","Sri College of Engineering"
];

const UNIVERSITY_OPTIONS = [
  "Anna University", "University of Madras", "Amrita Vishwa Vidyapeetham",
  "IIT Madras", "VIT Vellore", "SRM Institute of Science and Technology",
  "SSN College of Engineering", "Saveetha Institute of Medical & Technical Sciences",
  "Coimbatore Institute of Technology", "PSG College of Technology"
];


const BRANCH_OPTIONS = [
  "Computer Science", "Electrical Engineering", "Mechanical Engineering",
  "Civil Engineering", "Electronics Engineering", "Information Technology",
  "Business Administration", "Economics", "Physics", "Mathematics",
  "Chemistry", "Biotechnology", "Philosophy", "Law", "Architecture"
];

export default function EducationStep({ formData, setFormData, errors }) {
  const [showModal, setShowModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);

  const [suggestions, setSuggestions] = useState({});

  const handleArrayChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const arr = [...prev.education];
      arr[idx][name] = value;
      return { ...prev, education: arr };
    });
  };

  const handleDeleteClick = (idx) => {
    setDeleteIdx(idx);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setFormData((prev) => {
      const arr = [...prev.education];
      arr.splice(deleteIdx, 1);
      return { ...prev, education: arr };
    });
    setShowModal(false);
    setDeleteIdx(null);
  };

  const handleSuggestionClick = (idx, field, value) => {
    setFormData((prev) => {
      const arr = [...prev.education];
      arr[idx][field] = value;
      return { ...prev, education: arr };
    });
    setSuggestions((prev) => ({ ...prev, [`${idx}-${field}`]: [] }));
  };

  const filterSuggestions = (field, options, input) => {
    if (!input.trim()) return options;
    return options.filter(opt => opt.toLowerCase().includes(input.toLowerCase()));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Education</h2>
      <p className="mb-4 text-gray-700">Add your higher educational background</p>

      <div className="main-container max-h-[400px] overflow-y-auto pr-2">
        {formData.education.map((edu, idx) => (
          <div key={idx} className="relative p-4 mb-6 rounded border-gray-200 bg-white">
            {formData.education.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteClick(idx)}
                className="absolute right-2 top-2 text-red-500"
              >
                <X />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Higher Education Level */}
              <div className="flex flex-col gap-1 relative">
                <label className="font-bold">Education Level<span className="text-red-500">*</span></label>
                <input
                  name="level"
                  value={edu.level}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(val)) {
                      handleArrayChange(idx, e);
                      setSuggestions((prev) => ({
                        ...prev,
                        [`${idx}-level`]: filterSuggestions("level", LEVEL_OPTIONS, val)
                      }));
                    }
                  }}
                  onFocus={() =>
                    setSuggestions((prev) => ({
                      ...prev,
                      [`${idx}-level`]: LEVEL_OPTIONS
                    }))
                  }
                  onBlur={() => setTimeout(() =>
                    setSuggestions((prev) => ({ ...prev, [`${idx}-level`]: [] }))
                  , 150)}
                  placeholder="Higher Education Level "
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {suggestions[`${idx}-level`] && suggestions[`${idx}-level`].length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 rounded shadow w-full top-full mt-1 max-h-40 overflow-y-auto z-10">
                    {suggestions[`${idx}-level`].map((opt) => (
                      <li
                        key={opt}
                        onMouseDown={() => handleSuggestionClick(idx, "level", opt)}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
                {errors?.level && <p className="text-red-500 text-sm">{errors.level}</p>}
              </div>

              {/* Institution */}
              <div className="flex flex-col gap-1 relative">
                <label className="font-bold">Institution<span className="text-red-500">*</span></label>
                <input
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(val)) {
                      handleArrayChange(idx, e);
                      setSuggestions((prev) => ({
                        ...prev,
                        [`${idx}-institution`]: filterSuggestions("institution", INSTITUTION_OPTIONS, val)
                      }));
                    }
                  }}
                  onFocus={() =>
                    setSuggestions((prev) => ({
                      ...prev,
                      [`${idx}-institution`]: INSTITUTION_OPTIONS
                    }))
                  }
                  onBlur={() => setTimeout(() =>
                    setSuggestions((prev) => ({ ...prev, [`${idx}-institution`]: [] }))
                  , 150)}
                  placeholder="Institution "
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {suggestions[`${idx}-institution`] && suggestions[`${idx}-institution`].length > 0 && (
                  <ul className="absolute bg-white border rounded shadow w-full top-full mt-1 max-h-40 overflow-y-auto z-10 border-gray-300">
                    {suggestions[`${idx}-institution`].map((opt) => (
                      <li
                        key={opt}
                        onMouseDown={() => handleSuggestionClick(idx, "institution", opt)}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
                {errors?.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
              </div>

              {/* University */}
              <div className="flex flex-col gap-1 relative">
                <label className="font-bold">University<span className="text-red-500">*</span></label>
                <input
                  name="university"
                  value={edu.university}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(val)) {
                      handleArrayChange(idx, e);
                      setSuggestions((prev) => ({
                        ...prev,
                        [`${idx}-university`]: filterSuggestions("university", UNIVERSITY_OPTIONS, val)
                      }));
                    }
                  }}
                  onFocus={() =>
                    setSuggestions((prev) => ({
                      ...prev,
                      [`${idx}-university`]: UNIVERSITY_OPTIONS
                    }))
                  }
                  onBlur={() => setTimeout(() =>
                    setSuggestions((prev) => ({ ...prev, [`${idx}-university`]: [] }))
                  , 150)}
                  placeholder="University "
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {suggestions[`${idx}-university`] && suggestions[`${idx}-university`].length > 0 && (
                  <ul className="absolute bg-white border rounded shadow w-full top-full mt-1 max-h-40 overflow-y-auto z-10 border-gray-300">
                    {suggestions[`${idx}-university`].map((opt) => (
                      <li
                        key={opt}
                        onMouseDown={() => handleSuggestionClick(idx, "university", opt)}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
                {errors?.university && <p className="text-red-500 text-sm">{errors.university}</p>}
              </div>

              {/* Branch */}
              <div className="flex flex-col gap-1 relative">
                <label className="font-bold">Branch<span className="text-red-500">*</span></label>
                <input
                  name="branch"
                  value={edu.branch}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(val)) {
                      handleArrayChange(idx, e);
                      setSuggestions((prev) => ({
                        ...prev,
                        [`${idx}-branch`]: filterSuggestions("branch", BRANCH_OPTIONS, val)
                      }));
                    }
                  }}
                  onFocus={() =>
                    setSuggestions((prev) => ({
                      ...prev,
                      [`${idx}-branch`]: BRANCH_OPTIONS
                    }))
                  }
                  onBlur={() => setTimeout(() =>
                    setSuggestions((prev) => ({ ...prev, [`${idx}-branch`]: [] }))
                  , 150)}
                  placeholder="Branch"
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {suggestions[`${idx}-branch`] && suggestions[`${idx}-branch`].length > 0 && (
                  <ul className="absolute bg-white border rounded shadow w-full top-full mt-1 max-h-40 overflow-y-auto z-10 border-gray-300">
                    {suggestions[`${idx}-branch`].map((opt) => (
                      <li
                        key={opt}
                        onMouseDown={() => handleSuggestionClick(idx, "branch", opt)}
                        className="p-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
                {errors?.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
              </div>

              {/* Year From */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">Year From<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="yearFrom"
                  value={edu.yearFrom}
                  onChange={(e) => handleArrayChange(idx, e)}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {errors?.yearFrom && <p className="text-red-500 text-sm">{errors.yearFrom}</p>}
              </div>

              {/* Year To */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">Year To<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="yearTo"
                  value={edu.yearTo}
                  onChange={(e) => handleArrayChange(idx, e)}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                />
                {errors?.yearTo && <p className="text-red-500 text-sm">{errors.yearTo}</p>}
              </div>

              {/* Marks */}
              <div className="flex flex-col gap-1">
                <label className="font-bold">Marks (Percentage or CGPA)<span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="marks"
                  value={edu.marks}
                  onChange={(e) => {
                    if (!isNaN(e.target.value) && +e.target.value <= 100) {
                      handleArrayChange(idx, e);
                    }
                  }}
                  className="border p-2 border-gray-300 rounded-md outline-none"
                  placeholder="Marks"
                />
                {errors?.marks && <p className="text-red-500 text-sm">{errors.marks}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ConfirmModal
          title="Delete Education Entry"
          message="Are you sure you want to delete this education entry? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmLabel="Delete"
        />
      )}
    </div>
  );
}