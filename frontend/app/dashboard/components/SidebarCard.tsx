import { 
  FiFileText, 
  FiSearch, 
  FiBookmark, 
  FiZap, 
  FiCheckCircle, 
  FiShield,
  FiActivity
} from "react-icons/fi";
import Link from "next/link";

export default function SidebarCard() {
  return (
    <div className="space-y-6">
      {/* 1. Quick Actions */}
      <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Actions</h3>
        <p className="text-sm text-gray-400 font-medium mb-6">Boost your job search</p>

        <div className="space-y-3">
          <Link href="/resume-analyzer">
            <button className="w-full flex items-center gap-3 border border-gray-100 rounded-xl py-3 px-4 hover:bg-gray-50 transition font-bold text-gray-700 text-sm mb-3">
              <FiZap className="text-slate-900" />
              Analyze Resume
            </button>
          </Link>

          <Link href="/job-matcher">
            <button className="w-full flex items-center gap-3 border border-gray-100 rounded-xl py-3 px-4 hover:bg-gray-50 transition font-bold text-gray-700 text-sm mb-3">
              <FiSearch className="text-slate-900" />
              Find Jobs
            </button>
          </Link>

          <Link href="/saved-jobs">
            <button className="w-full flex items-center gap-3 border border-gray-100 rounded-xl py-3 px-4 hover:bg-gray-50 transition font-bold text-gray-700 text-sm">
              <FiBookmark className="text-slate-900" />
              View Saved Jobs
            </button>
          </Link>
        </div>
      </div>

      {/* 2. Recent Activity */}
      <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <FiFileText className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Resume analyzed</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <FiActivity className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">New job match found</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">3 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <FiBookmark className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Job saved</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">5 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <FiCheckCircle className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Application submitted</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pro Tip Card */}
      <div className="bg-black p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-all">
          <FiZap size={40} className="text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
             <FiShield className="text-white" />
             <h3 className="text-lg font-bold text-white uppercase tracking-widest text-xs">Pro Tip</h3>
          </div>
          
          <p className="text-gray-300 text-sm font-medium leading-relaxed mb-8">
            Update your resume with AI-suggested keywords to increase your match score by up to 30%!
          </p>

          <Link href="/resume-analyzer">
            <button className="bg-white m-0 text-black px-8 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition shadow-lg">
              Try Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
