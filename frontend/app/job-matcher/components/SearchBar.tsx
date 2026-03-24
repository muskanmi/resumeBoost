"use client";

import { useState } from "react";
import { FiSearch, FiSliders, FiChevronDown } from "react-icons/fi";
import FilterSidebar from "./FilterSidebar";

export default function SearchBar({
  selectedPortals,
  setSelectedPortals,
}: {
  selectedPortals: string[];
  setSelectedPortals: (val: string[]) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selected, setSelected] = useState("Best Match");
  const [openSidebar, setOpenSidebar] = useState(false);

  const options = ["Best Match", "Most Recent", "Highest Salary"];
  const portals = ["LinkedIn", "Naukri", "Instahyre", "Wellfound"];

  // ✅ Toggle portal (chips + sidebar sync)
  const togglePortal = (portal: string) => {
    if (selectedPortals.includes(portal)) {
      setSelectedPortals(selectedPortals.filter((p) => p !== portal));
    } else {
      setSelectedPortals([...selectedPortals, portal]);
    }
  };

  return (
    <>
      <div className="border rounded-2xl p-5 bg-white relative">
        <div className="flex gap-3">
          {/* 🔍 Search */}
          <div className="flex items-center flex-1 bg-gray-100 rounded-lg px-3">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              placeholder="Search jobs, companies, or skills..."
              className="bg-transparent outline-none w-full py-2 text-sm"
            />
          </div>

          {/* 📊 Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="border px-4 py-2 rounded-lg flex items-center gap-2 text-sm bg-white"
            >
              {selected}
              <FiChevronDown />
            </button>

            {openDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-md z-50 overflow-hidden">
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelected(opt);
                      setOpenDropdown(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      selected === opt ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ⚙️ Filters Button */}
          <button
            onClick={() => setOpenSidebar(true)}
            className="border px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-100"
          >
            <FiSliders />
            Filters
          </button>
        </div>

        {/* ✅ Clickable Platforms */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {portals.map((p) => {
            const isActive = selectedPortals.includes(p);

            return (
              <span
                key={p}
                onClick={() => togglePortal(p)}
                className={`text-xs px-3 py-1 rounded-full cursor-pointer transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {p}
              </span>
            );
          })}
        </div>
      </div>

      {/* ✅ Sidebar with shared state */}
      <FilterSidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        selectedPortals={selectedPortals}
        setSelectedPortals={setSelectedPortals}
      />
    </>
  );
}
