"use client";

import { useState } from "react";
import { FiZap, FiCopy, FiCheckCircle } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";

export default function ResumeAnalysisSection() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("Suggested");

  const handleAnalyze = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <div className="border rounded-2xl p-6 bg-white">
        <h3 className="font-semibold text-gray-900">
          Job Description Analysis
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Paste the full job description to get keyword suggestions
        </p>

        <textarea
          placeholder="Paste the full job description here..."
          className="w-full h-40 bg-gray-100 rounded-xl p-4 outline-none resize-none"
        />

        <button
          onClick={handleAnalyze}
          className="mt-4 bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FiZap />
          {loading ? "Analyzing..." : "Analyze with AI"}
        </button>
      </div>

      {/* RESULTS */}
      {showResults && (
        <>
          {/* SCORES */}
          <div className="border rounded-2xl p-6 bg-white">
            <h3 className="font-semibold text-gray-900">Analysis Results</h3>
            <p className="text-sm text-gray-500 mb-6">
              Based on AI analysis of your resume against the job description
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Overall Match", value: 78 },
                { label: "Keyword Match", value: 65 },
                { label: "Skills Match", value: 82 },
                { label: "Experience Match", value: 85 },
              ].map((item) => (
                <div key={item.label}>
                  <h2 className="text-2xl font-bold">{item.value}%</h2>
                  <p className="text-sm text-gray-500 mb-2">{item.label}</p>

                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-black rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABS */}
          <div className="border rounded-2xl p-5 bg-white">
            {/* TAB HEADER */}
            <div className="mb-5">
              <div className="flex bg-gray-100 p-1 rounded-xl w-full">
                {["Suggested", "Missing", "Strengths", "Improvements"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 text-sm rounded-lg transition font-medium ${
                        activeTab === tab
                          ? "bg-white shadow text-gray-900"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab === "Suggested"
                        ? "Suggested Keywords"
                        : tab === "Missing"
                          ? "Missing Keywords"
                          : tab}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* COPY ALL */}
            <div className="flex justify-end mb-4">
              <button className="border px-3 py-1 rounded-lg text-sm flex items-center gap-1 text-gray-600 hover:bg-gray-50">
                <FiCopy />
                Copy All
              </button>
            </div>

            {/* ===================== */}
            {/* SUGGESTED */}
            {/* ===================== */}
            {activeTab === "Suggested" && (
              <div className="space-y-3">
                {[
                  {
                    title: "React.js",
                    level: "High",
                    desc: "Required skill in JD",
                  },
                  {
                    title: "TypeScript",
                    level: "High",
                    desc: "Mentioned 3 times",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex justify-between items-center border rounded-xl p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>

                    <FiCopy className="cursor-pointer text-gray-500" />
                  </div>
                ))}
              </div>
            )}

            {/* ===================== */}
            {/* MISSING KEYWORDS */}
            {/* ===================== */}
            {activeTab === "Missing" && (
              <div>
                <h4 className="font-semibold mb-1">Missing Keywords</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Important keywords from the job description not found in your
                  resume
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  {[
                    "Node.js",
                    "GraphQL",
                    "Docker",
                    "Microservices",
                    "Performance Optimization",
                  ].map((item) => (
                    <span
                      key={item}
                      className="border px-3 py-1 rounded-full text-sm bg-gray-50"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="bg-gray-100 text-sm p-3 rounded-lg">
                  💡 Tip: Consider adding these keywords where relevant to your
                  experience.
                </div>
              </div>
            )}

            {/* ===================== */}
            {/* STRENGTHS */}
            {/* ===================== */}
            {activeTab === "Strengths" && (
              <div className="space-y-3">
                <h4 className="font-semibold">Your Strengths</h4>
                <p className="text-sm text-gray-500">
                  What's working well in your resume
                </p>

                {[
                  "Strong technical background",
                  "Relevant experience duration",
                  "Leadership experience",
                  "Education matches requirements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-green-50 text-green-800 p-3 rounded-lg"
                  >
                    <FiCheckCircle />
                    {item}
                  </div>
                ))}
              </div>
            )}

            {/* ===================== */}
            {/* IMPROVEMENTS */}
            {/* ===================== */}
            {activeTab === "Improvements" && (
              <div className="space-y-3">
                <h4 className="font-semibold">Areas for Improvement</h4>
                <p className="text-sm text-gray-500">
                  Suggestions to make your resume stronger
                </p>

                {[
                  "Add more specific project metrics",
                  "Include certifications if any",
                  "Quantify achievements with numbers",
                  "Add technical skills section",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg"
                  >
                    <FiTrendingUp />
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
