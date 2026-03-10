"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth(); // ✅ get user from context

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Resume Analyzer", href: "/resume-analyzer" },
    { name: "Job Matcher", href: "/job-matcher" },
    { name: "Saved Jobs", href: "/saved-jobs" },
    { name: "Profile", href: "/profile" },
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

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-gray-200 text-black"
                        : "hover:bg-gray-400 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* RIGHT SECTION */}
        {user ? (
          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-black">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-full"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
