import { FiClock, FiCheck, FiLoader } from "react-icons/fi";
import { useState } from "react";

interface JobCardProps {
  title: string;
  company: string;
  salary: string;
  location: string;
  match: string;
  jobUrl?: string; // ✅ Added jobUrl
  onApplySuccess?: () => void; // ✅ Callback to update stats
  onSaveSuccess?: () => void; // ✅ Added onSaveSuccess
  initialApplied?: boolean; // ✅ Added initialApplied
  initialSaved?: boolean; // ✅ Added initialSaved
  platform?: string; // ✅ Added platform tag
}

export default function JobCard({
  title,
  company,
  salary,
  location,
  match,
  jobUrl = "https://www.linkedin.com/jobs", // Default link
  onApplySuccess,
  onSaveSuccess,
  initialApplied = false,
  initialSaved = false,
  platform = "LinkedIn",
}: JobCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(initialApplied);
  const [hasSaved, setHasSaved] = useState(initialSaved);

  const handleApply = async () => {
    setIsApplying(true);
    
    // Simulate Backend Application Tracking
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsApplying(false);
    setHasApplied(true);
    if (onApplySuccess) onApplySuccess();

    // Opening original job URL in new tab
    window.open(jobUrl, "_blank", "noopener,noreferrer");
  };

  const handleSave = async () => {
    if (hasSaved) return; // Toggle off logic can be added later if needed
    
    // Quick Save Simulation
    setHasSaved(true);
    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm transition-all hover:border-gray-300">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-full font-bold">
            {match} Match
          </span>
        </div>
        <span className="text-xs font-semibold text-gray-400">{platform}</span>
      </div>

      <p className="text-gray-600 mb-2">{company}</p>

      <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
        <span>{location}</span>
        <span>•</span>
        <span>{salary}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <FiClock size={14} /> 2 hours ago
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleApply}
          disabled={isApplying || hasApplied}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition shadow-sm ${
            hasApplied
              ? "bg-green-100 text-green-700 cursor-default"
              : isApplying
              ? "bg-slate-100 text-slate-400"
              : "bg-black text-white hover:bg-slate-800"
          }`}
        >
          {isApplying ? (
            <>
              <FiLoader className="animate-spin" />
              Applying...
            </>
          ) : hasApplied ? (
            <>
              <FiCheck size={16} />
              Applied
            </>
          ) : (
            "Apply Now"
          )}
        </button>

        <button 
          onClick={handleSave}
          disabled={hasSaved}
          className={`border px-5 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 ${
            hasSaved 
              ? "bg-amber-50 border-amber-100 text-amber-600 cursor-default" 
              : "border-gray-100 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {hasSaved ? (
            <>
              <FiCheck size={16} />
              Saved
            </>
          ) : "Save"}
        </button>
      </div>
    </div>
  );
}
