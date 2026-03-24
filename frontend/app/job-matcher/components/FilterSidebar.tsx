"use client";

import { FiX } from "react-icons/fi";

export default function FilterSidebar({
  open,
  onClose,
  selectedPortals,
  setSelectedPortals,
}: {
  open: boolean;
  onClose: () => void;
  selectedPortals: string[];
  setSelectedPortals: (val: string[]) => void;
}) {
  const portals = ["LinkedIn", "Naukri", "Instahyre", "Wellfound"];

  // ✅ Toggle portal (shared with SearchBar)
  const togglePortal = (portal: string) => {
    if (selectedPortals.includes(portal)) {
      setSelectedPortals(selectedPortals.filter((p) => p !== portal));
    } else {
      setSelectedPortals([...selectedPortals, portal]);
    }
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">Filter Jobs</h2>
          <FiX className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* ✅ Job Portals */}
          <div>
            <h3 className="font-medium mb-3">Job Portals</h3>

            {portals.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 mb-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPortals.includes(item)}
                  onChange={() => togglePortal(item)}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>

          {/* Job Type (optional for now) */}
          <div>
            <h3 className="font-medium mb-3">Job Type</h3>

            {["Full-time", "Contract", "Remote Only"].map((item, i) => (
              <label
                key={item}
                className="flex items-center gap-3 mb-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={i === 0}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
