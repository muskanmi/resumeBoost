"use client";

import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiBookmark,
  FiExternalLink,
} from "react-icons/fi";

interface Props {
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
}

export default function JobMatcherCard({
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
}: Props) {
  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm flex justify-between gap-6">
      {/* LEFT */}
      <div className="flex-1">
        {/* Title */}
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg font-semibold">{title}</h3>

          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
            {match} Match
          </span>
        </div>

        {/* Company */}
        <p className="text-gray-600 mb-2">{company}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <FiMapPin size={14} />
            {location}
          </span>

          <span>${salary}</span>

          <span className="flex items-center gap-1">
            <FiBriefcase size={14} />
            {type}
          </span>

          <span className="flex items-center gap-1">
            <FiClock size={14} />
            {time}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {/* Skills */}
        <div className="flex gap-2 flex-wrap mb-4">
          {skills.map((s) => (
            <span
              key={s}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Why match */}
        <p className="text-sm text-gray-500 border-t pt-3">
          <strong>Why this matches:</strong> Excellent match with your skills
          and experience
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex flex-col items-end gap-3">
        <span className="text-xs border px-3 py-1 rounded-full">
          {platform}
        </span>

        <button className="bg-slate-900 text-white px-5 py-2 rounded-lg flex items-center gap-2">
          Apply Now
          <FiExternalLink />
        </button>

        <button className="border px-5 py-2 rounded-lg flex items-center gap-2">
          <FiBookmark />
          Save
        </button>
      </div>
    </div>
  );
}
