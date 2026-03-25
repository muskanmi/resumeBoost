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
  const [boostSavedJobs, setBoostSavedJobs] = useState<any[]>([]);
  const [selectedPortals, setSelectedPortals] = useState<string[]>([
    "LinkedIn",
    "Naukri",
    "Instahyre",
    "Wellfound",
  ]);

  useEffect(() => {
    if (!loading && user) {
      const stored = localStorage.getItem("BOOST_SAVED_JOBS");
      if (stored) setBoostSavedJobs(JSON.parse(stored));
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleApplySuccess = (job: any) => {
    setBoostSavedJobs((prev) => {
      const exists = prev.find((j) => j.id.toString() === job.id.toString());
      let newState;
      if (exists) {
        newState = prev.map((j) =>
          j.id.toString() === job.id.toString() ? { ...j, status: "applied" } : j
        );
      } else {
        newState = [
          ...prev,
          { ...job, status: "applied", savedOn: new Date().toLocaleDateString("en-GB") },
        ];
      }
      localStorage.setItem("BOOST_SAVED_JOBS", JSON.stringify(newState));
      return newState;
    });
  };

  const handleSaveSuccess = (job: any) => {
    setBoostSavedJobs((prev) => {
      const exists = prev.find((j) => j.id.toString() === job.id.toString());
      if (exists) return prev;

      const newState = [
        ...prev,
        { ...job, status: "saved", savedOn: new Date().toLocaleDateString("en-GB") },
      ];
      localStorage.setItem("BOOST_SAVED_JOBS", JSON.stringify(newState));
      return newState;
    });
  };

  if (loading || !user) return null;

  const jobs = [
    {
      id: "matcher-1",
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
      id: "matcher-2",
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

  const filteredJobs = jobs.filter((job) =>
    selectedPortals.includes(job.platform),
  );

  const appliedIds = boostSavedJobs.filter(j => j.status === 'applied').map(j => j.id.toString());
  const savedIds = boostSavedJobs.map(j => j.id.toString());

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">AI Job Matcher</h1>
            <p className="text-gray-600 mt-1">
              Find jobs matching your resume across LinkedIn, Naukri, Instahyre, and Wellfound
            </p>
          </div>

          <SearchBar
            selectedPortals={selectedPortals}
            setSelectedPortals={setSelectedPortals}
          />

          <p className="text-gray-600 mt-6 mb-4">
            Found {filteredJobs.length} jobs matching your profile
          </p>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <JobMatcherCard 
                key={job.id} 
                {...job} 
                initialApplied={appliedIds.includes(job.id)}
                initialSaved={savedIds.includes(job.id)}
                onApplySuccess={() => handleApplySuccess(job)}
                onSaveSuccess={() => handleSaveSuccess(job)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
