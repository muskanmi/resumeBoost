"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  FiBookmark,
  FiExternalLink,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiCalendar,
  FiTrash2,
} from "react-icons/fi";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  savedOn: string;
  match: number;
  tags: string[];
  source: string;
  sourceUrl: string;
  status: "saved" | "applied";
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const INITIAL_JOBS: SavedJob[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Tech Innovations Inc",
    location: "Remote",
    salary: "$120k - $150k",
    type: "Full-time",
    savedOn: "20/2/2024",
    match: 95,
    tags: ["React", "TypeScript", "Node.js"],
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com",
    status: "saved",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupHub",
    location: "San Francisco, CA",
    salary: "$130k - $170k",
    type: "Full-time",
    savedOn: "19/2/2024",
    match: 92,
    tags: ["React", "Python", "PostgreSQL"],
    source: "Wellfound",
    sourceUrl: "https://wellfound.com",
    status: "saved",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Digital Solutions Ltd",
    location: "Bangalore, India",
    salary: "₹15L - ₹25L",
    type: "Full-time",
    savedOn: "18/2/2024",
    match: 88,
    tags: ["React", "JavaScript", "CSS"],
    source: "Naukri",
    sourceUrl: "https://naukri.com",
    status: "applied",
  },
  {
    id: 4,
    title: "Lead Frontend Engineer",
    company: "Enterprise Systems",
    location: "New York, NY",
    salary: "$150k - $180k",
    type: "Full-time",
    savedOn: "17/2/2024",
    match: 90,
    tags: ["React", "TypeScript", "GraphQL"],
    source: "LinkedIn",
    sourceUrl: "https://linkedin.com",
    status: "applied",
  },
];

// ─── Stat Card Component ───────────────────────────────────────────────────────
function StatItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="flex-1 border rounded-2xl bg-white px-6 py-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <Icon size={22} className="text-gray-400" />
    </div>
  );
}

// ─── Job Card Component ────────────────────────────────────────────────────────
function JobCard({
  job,
  onRemove,
}: {
  job: SavedJob;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="border rounded-2xl bg-white p-5 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Left: Job Info */}
        <div className="flex-1 min-w-0">
          {/* Title + Match Badge */}
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="text-base font-semibold text-gray-900">
              {job.title}
            </h3>
            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              {job.match}% Match
            </span>
          </div>

          {/* Company */}
          <p className="text-sm text-gray-600 mb-3">{job.company}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <FiMapPin size={12} />
              {job.location || "Remote"}
            </span>
            <span className="flex items-center gap-1">
              <FiDollarSign size={12} />
              {job.salary || "Competitive"}
            </span>
            {job.type && (
              <span className="flex items-center gap-1">
                <FiBriefcase size={12} />
                {job.type}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />
              Saved on {job.savedOn || "Recent"}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {(job.tags || []).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Source + Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* Source badge */}
          <span className="text-xs text-gray-500 font-medium">{job.source}</span>

          {/* Action Button (Apply Now or Applied) */}
          {job.status === "saved" ? (
            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Apply Now
              <FiExternalLink size={13} />
            </a>
          ) : (
            <div className="flex items-center gap-1.5 bg-gray-100 text-gray-400 text-sm font-medium px-4 py-2 rounded-lg cursor-not-allowed">
              <FiClock size={13} />
              Applied
            </div>
          )}

          {/* Remove */}
          <button
            onClick={() => onRemove(job.id)}
            className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-medium transition"
          >
            <FiTrash2 size={13} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function SavedJobsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState<SavedJob[]>(INITIAL_JOBS);
  const [activeTab, setActiveTab] = useState<"saved" | "applied">("saved");

  useEffect(() => {
    // 1. Initial Auth Check
    if (!loading && !user) {
      router.push("/login");
    }

    // 2. Load from LocalStorage
    const stored = localStorage.getItem("BOOST_SAVED_JOBS");
    if (stored) {
      try {
        setJobs(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved jobs", e);
      }
    }
  }, [user, loading, router]);

  // 3. Persist changes
  useEffect(() => {
    if (jobs !== INITIAL_JOBS) {
      localStorage.setItem("BOOST_SAVED_JOBS", JSON.stringify(jobs));
    }
  }, [jobs]);

  const savedCount = jobs.filter((j) => j.status === "saved").length;
  const appliedCount = jobs.filter((j) => j.status === "applied").length;
  const filteredJobs = jobs.filter((j) => j.status === activeTab);

  const handleRemove = (id: number) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  if (loading || !user) return null; // Wait for auth or redirecting...

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">

          {/* ── Page Header ── */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
            <p className="text-gray-500 mt-1">
              Manage your saved job listings and track applications
            </p>
          </div>

          {/* ── Stat Cards ── */}
          <div className="flex gap-4 mb-8">
            <StatItem
              label="Total Saved"
              value={jobs.length}
              icon={FiBookmark}
            />
            <StatItem
              label="To Apply"
              value={savedCount}
              icon={FiExternalLink}
            />
            <StatItem
              label="Applied"
              value={appliedCount}
              icon={FiClock}
            />
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Saved ({savedCount})
            </button>
            <button
              onClick={() => setActiveTab("applied")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "applied"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Applied ({appliedCount})
            </button>
          </div>

          {/* ── Job List ── */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onRemove={handleRemove} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FiBookmark size={40} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-base">
                No{" "}
                {activeTab === "saved" ? "saved" : "applied"} jobs yet.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {activeTab === "saved"
                  ? "Start saving jobs from the Job Matcher page."
                  : "Mark a saved job as applied to track it here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
