"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import SearchBar from "./components/SearchBar";
import JobMatcherCard from "./components/JobMatcherCard";

export default function JobMatcherPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  // ✅ Portal state
  const [selectedPortals, setSelectedPortals] = useState<string[]>([
    "LinkedIn",
    "Naukri",
    "Instahyre",
    "Wellfound",
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  // ✅ Jobs data (convert your static cards into array)
  const jobs = [
    {
      title: "Senior React Developer",
      company: "Tech Innovations Inc",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
      time: "2 hours ago",
      match: "95%",
      platform: "LinkedIn",
      description: "We're looking for an experienced React developer...",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
    },
    {
      title: "Full Stack Engineer",
      company: "StartupHub",
      location: "San Francisco, CA",
      salary: "$130k - $170k",
      type: "Full-time",
      time: "4 hours ago",
      match: "92%",
      platform: "Wellfound",
      description: "Join our growing team as a Full Stack Engineer...",
      skills: ["React", "Python", "PostgreSQL", "Docker"],
    },
  ];

  // ✅ FILTER LOGIC
  const filteredJobs = jobs.filter((job) =>
    selectedPortals.includes(job.platform),
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Job Matcher</h1>

            <p className="text-gray-600 mt-1">
              Find jobs matching your resume across LinkedIn, Naukri, Instahyre,
              and Wellfound
            </p>
          </div>

          {/* ✅ Pass state to SearchBar */}
          <SearchBar
            selectedPortals={selectedPortals}
            setSelectedPortals={setSelectedPortals}
          />

          {/* Results text */}
          <p className="text-gray-600 mt-6 mb-4">
            Found {filteredJobs.length} jobs matching your profile
          </p>

          {/* Jobs */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <JobMatcherCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
