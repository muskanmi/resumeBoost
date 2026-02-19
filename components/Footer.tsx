import React from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo */}
          <div className="text-xl font-semibold">ResumeBoost</div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-8 text-sm text-gray-300">
            <Link href="#">Company</Link>
            <Link href="#">Product</Link>
            <Link href="#">Features</Link>
            <Link href="#">How It Works</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
          <p>© 2024 ResumeBoost. All rights reserved.</p>

          <div className="flex gap-5 text-lg">
            <FaTwitter className="hover:text-white cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-white cursor-pointer transition" />
            <FaGithub className="hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
