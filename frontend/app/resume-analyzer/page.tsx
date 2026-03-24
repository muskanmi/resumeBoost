"use client";

import Navbar from "@/components/Navbar";
import { FiUploadCloud, FiCheckCircle, FiDownload } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import ResumeAnalysisSection from "./components/ResumeAnalysisSection";

export default function ResumeAnalyzerPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  if (loading || !user) return null;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* ✅ TITLE */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              AI Resume Analyzer
            </h1>
            <p className="text-gray-600 mt-1">
              Upload your resume and paste job descriptions to get AI-powered
              keyword suggestions
            </p>
          </div>

          {/* ✅ RESUME UPLOAD (THIS WAS MISSING) */}
          <div className="border rounded-2xl p-6 mb-8">
            <h2 className="font-semibold text-gray-900 mb-1">Your Resume</h2>
            <p className="text-gray-500 text-sm mb-4">
              Upload your current resume to analyze against job descriptions
            </p>

            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-black transition"
            >
              <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-3" />

              <p className="text-sm font-medium text-gray-800">
                Click to upload or drag and drop
              </p>

              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX (max. 5MB)
              </p>

              <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm">
                Upload Resume
              </button>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </div>

            {/* Uploaded File */}
            {file && (
              <div className="mt-4 bg-gray-100 rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-600 text-lg" />

                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">Uploaded just now</p>
                  </div>
                </div>

                <FiDownload className="text-gray-600 cursor-pointer" />
              </div>
            )}
          </div>

          {/* ✅ JOB DESCRIPTION + RESULTS (NEW SECTION) */}
          <ResumeAnalysisSection />
        </div>
      </div>
    </>
  );
}
