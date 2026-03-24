"use client";
import { FiClock } from "react-icons/fi";

interface JobCardProps {
  title: string;
  company: string;
  salary: string;
  location: string;
  match: string;
}

export default function JobCard({
  title,
  company,
  salary,
  location,
  match,
}: JobCardProps) {
  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">
            {match} Match
          </span>
        </div>

        {/* Platform tag */}
        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          LinkedIn
        </span>
      </div>

      {/* Company */}
      <p className="text-gray-600 mb-2">{company}</p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
        <span>{location}</span>
        <span>•</span>
        <span>{salary}</span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <FiClock size={14} />2 hours ago
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium">
          Apply Now
        </button>

        <button className="border px-4 py-2 rounded-lg text-gray-700">
          Save
        </button>
      </div>
    </div>
  );
}
