"use client";

import StatCard from "./components/StatCard";
import JobCard from "./components/JobCard";
import SidebarCard from "./components/SidebarCard";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/app/context/AuthContext";
import { FiFileText, FiTarget, FiBookmark, FiTrendingUp } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [boostSavedJobs, setBoostSavedJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"recommended" | "applied">(
    "recommended",
  );
  const [isRefreshing, setIsRefreshing] = useState(true);

  // 1. Initial State Load
  useEffect(() => {
    if (!loading && user) {
      // Load unified state
      const stored = localStorage.getItem("BOOST_SAVED_JOBS");
      const savedData = stored ? JSON.parse(stored) : [];
      setBoostSavedJobs(savedData);

      fetch("/api/jobs")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setAllJobs(data);
        })
        .finally(() => setIsRefreshing(false));
    }
  }, [user, loading]);

  // 2. Auth Guard
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleApplySuccess = (jobId: string) => {
    // Find job in allJobs to get metadata
    const jobData = allJobs.find((j) => j.id === jobId);
    if (!jobData) return;

    setBoostSavedJobs((prev) => {
      const exists = prev.find((j) => j.id.toString() === jobId.toString());
      let newState;
      if (exists) {
        newState = prev.map((j) =>
          j.id.toString() === jobId.toString() ? { ...j, status: "applied" } : j
        );
      } else {
        newState = [
          ...prev,
          {
            ...jobData,
            status: "applied",
            savedOn: new Date().toLocaleDateString("en-GB"),
          },
        ];
      }
      localStorage.setItem("BOOST_SAVED_JOBS", JSON.stringify(newState));
      return newState;
    });
  };

  const handleSaveSuccess = (jobId: string) => {
    const jobData = allJobs.find((j) => j.id === jobId);
    if (!jobData) return;

    setBoostSavedJobs((prev) => {
      const exists = prev.find((j) => j.id.toString() === jobId.toString());
      if (exists) return prev; // Already saved

      const newState = [
        ...prev,
        {
          ...jobData,
          status: "saved",
          savedOn: new Date().toLocaleDateString("en-GB"),
        },
      ];
      localStorage.setItem("BOOST_SAVED_JOBS", JSON.stringify(newState));
      return newState;
    });
  };

  if (loading || !user) return null;

  // Filter lists based on the unified state
  const appliedIds = boostSavedJobs
    .filter((j) => j.status === "applied")
    .map((j) => j.id.toString());
    
  const savedIds = boostSavedJobs.map((j) => j.id.toString());

  const recommendedJobs = allJobs.filter((j) => !appliedIds.includes(j.id.toString()));
  const trackableAppliedJobs = boostSavedJobs.filter((j) => j.status === "applied");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <section className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-gray-500 mt-1 font-medium italic">
                You&apos;re currently on a mission to land your dream role.
              </p>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Resume Score"
              value="78%"
              subtitle="+12% from last update"
              icon={FiFileText}
              progress={78}
            />
            <StatCard
              title="Matched Jobs"
              value={recommendedJobs.length.toString()}
              subtitle="Fresh picks"
              icon={FiTarget}
            />
            <StatCard
              title="Saved Jobs"
              value={boostSavedJobs.length.toString()}
              subtitle="In your list"
              icon={FiBookmark}
            />
            <StatCard
              title="Applications"
              value={appliedIds.length.toString()}
              subtitle="Tracked Total"
              icon={FiTrendingUp}
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Jobs Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex bg-gray-50 p-1.5 rounded-2xl w-fit border border-gray-100 shadow-sm">
                  <button
                    onClick={() => setActiveTab("recommended")}
                    className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                      activeTab === "recommended"
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    Matched ({recommendedJobs.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("applied")}
                    className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                      activeTab === "applied"
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    Applied ({trackableAppliedJobs.length})
                  </button>
                </div>

                <Link
                  href="/job-matcher"
                  className="text-xs font-bold text-slate-400 hover:text-black border-b border-transparent hover:border-black transition"
                >
                  View All Search Lists →
                </Link>
              </div>

              {isRefreshing ? (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-44 bg-gray-50 rounded-3xl animate-pulse border-2 border-dashed border-gray-100"
                    />
                  ))}
                </div>
              ) : activeTab === "recommended" ? (
                recommendedJobs.length > 0 ? (
                  recommendedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      {...job}
                      initialSaved={savedIds.includes(job.id.toString())}
                      onApplySuccess={() => handleApplySuccess(job.id)}
                      onSaveSuccess={() => handleSaveSuccess(job.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-20 px-10 border-2 border-dashed rounded-[2rem] bg-gray-50 flex flex-col items-center gap-2">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">All caught up!</p>
                    <p className="text-gray-300 font-medium">Try analyzing your resume to find more matches.</p>
                  </div>
                )
              ) : trackableAppliedJobs.length > 0 ? (
                trackableAppliedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    initialApplied={true}
                    initialSaved={savedIds.includes(job.id.toString())}
                    onSaveSuccess={() => handleSaveSuccess(job.id)}
                  />
                ))
              ) : (
                <div className="text-center py-20 px-10 border-2 border-dashed rounded-[2rem] bg-gray-50 flex flex-col items-center gap-2">
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No pending applications</p>
                   <p className="text-gray-300 font-medium">Apply to a job to see it listed here.</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <SidebarCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
