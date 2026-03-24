"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

import {
  FiGrid,
  FiFileText,
  FiTarget,
  FiBookmark,
  FiUser,
} from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth(); // ✅ get user and loading state from context

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiGrid },
    { name: "Resume Analyzer", href: "/resume-analyzer", icon: FiFileText },
    { name: "Job Matcher", href: "/job-matcher", icon: FiTarget },
    { name: "Saved Jobs", href: "/saved-jobs", icon: FiBookmark },
    { name: "Profile", href: "/profile", icon: FiUser },
  ];

  return (
    <header className="bg-gray-100 border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-black rounded-md flex items-center justify-center text-white font-bold">
              ✦
            </div>
            <span className="text-xl font-semibold text-gray-900">
              BoostCareer
            </span>
          </Link>

          {/* NAV LINKS (ONLY IF LOGGED IN) */}
          {user && (
            <nav className="flex items-center gap-6 text-gray-700 font-medium">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg transition text-sm ${
                      isActive
                        ? "bg-gray-200 text-black"
                        : "hover:bg-gray-200 hover:text-black"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* RIGHT SECTION */}
        {loading ? (
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        ) : user ? (
          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold border-2 border-white shadow-sm">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm">
            <Link href="/login" className="text-gray-600 hover:text-black font-medium transition-colors">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-5 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
