import Image from "next/image";
import React from "react";
import { FaSearch, FaFileAlt, FaLayerGroup, FaChartLine } from "react-icons/fa";

const Features = () => {
  return (
    <section className="bg-slate-50 py-15">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Feature Card */}
            <FeatureCard
              icon={<FaFileAlt />}
              title="Smart Resume Analysis"
              description="Analyze your resume strengths and weaknesses, get actionable insights to boost ATS ranking."
              color="bg-blue-500"
            />

            <FeatureCard
              icon={<FaSearch />}
              title="AI-Powered Job Matching"
              description="Find the best jobs aligned with your skills and experience using AI embeddings."
              color="bg-blue-600"
            />

            <FeatureCard
              icon={<FaLayerGroup />}
              title="Job Aggregation from Multiple Platforms"
              description="Automatically gather and analyze listings from LinkedIn, Indeed, Glassdoor, and more."
              color="bg-teal-500"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Image Card */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/hero-image.png"
                alt="AI Dashboard"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Bottom Feature Card */}
            <FeatureCard
              icon={<FaChartLine />}
              title="Optimize for ATS"
              description="Receive keyword suggestions and improve your resume for Applicant Tracking Systems."
              color="bg-blue-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

const FeatureCard = ({ icon, title, description, color }: any) => {
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
                    hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`w-12 h-12 flex items-center justify-center text-white rounded-xl ${color} mb-4`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
