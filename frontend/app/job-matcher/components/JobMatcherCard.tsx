"use client";

import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiBookmark,
  FiExternalLink,
  FiCheck,
  FiLoader,
} from "react-icons/fi";
import { useState } from "react";

interface Props {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  time: string;
  match: string;
  platform: string;
  description: string;
  skills: string[];
  initialApplied?: boolean;
  initialSaved?: boolean;
  onApplySuccess?: () => void;
  onSaveSuccess?: () => void;
}

export default function JobMatcherCard({
  id,
  title,
  company,
  location,
  salary,
  type,
  time,
  match,
  platform,
  description,
  skills,
  initialApplied = false,
  initialSaved = false,
  onApplySuccess,
  onSaveSuccess,
}: Props) {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(initialApplied);
  const [hasSaved, setHasSaved] = useState(initialSaved);

  const handleApply = async () => {
    setIsApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsApplying(false);
    setHasApplied(true);
    if (onApplySuccess) onApplySuccess();
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      `${title} job at ${company} in ${location}`,
    )}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  const handleSave = () => {
    if (hasSaved) return;
    setHasSaved(true);
    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm flex justify-between gap-6">
      {/* LEFT */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-bold">
            {match} Match
          </span>
        </div>
        <p className="text-gray-600 mb-2">{company}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FiMapPin size={14} />
            {location}
          </span>
          <span>{salary}</span>
          <span className="flex items-center gap-1">
            <FiBriefcase size={14} />
            {type}
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={14} />
            {time}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {skills.map((s) => (
            <span key={s} className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 border-t pt-3">
          <strong>Why this matches:</strong> Excellent match with your skills and experience
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex flex-col items-end gap-3 min-w-[140px]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1 rounded-full">
          {platform}
        </span>
        <button
          onClick={handleApply}
          disabled={isApplying || hasApplied}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
            hasApplied
              ? "bg-green-100 text-green-700 cursor-default"
              : isApplying
              ? "bg-slate-100 text-slate-400 cursor-wait"
              : "bg-black text-white hover:bg-slate-800"
          }`}
        >
          {isApplying ? (
            <><FiLoader className="animate-spin" /> Processing</>
          ) : hasApplied ? (
            <><FiCheck size={16} /> Applied</>
          ) : (
            <>Apply Now <FiExternalLink /></>
          )}
        </button>

        <button 
          onClick={handleSave}
          className={`w-full border px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            hasSaved 
              ? "bg-amber-50 border-amber-200 text-amber-600 cursor-default" 
              : "border-gray-100 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {hasSaved ? (
            <><FiCheck size={16} /> Saved</>
          ) : (
            <><FiBookmark /> Save Job</>
          )}
        </button>
      </div>
    </div>
  );
}
