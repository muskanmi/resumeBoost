import React from "react";

const steps = [
  {
    id: 1,
    title: "Upload Your Resume",
    description: "Upload your PDF resume.",
  },
  {
    id: 2,
    title: "Let AI Scan Job Listings",
    description:
      "Advanced AI scans multiple job platforms to find matching opportunities.",
  },
  {
    id: 3,
    title: "Get Your Matches",
    description:
      "Receive a list of tailored job matches ranked by your resume’s relevance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">How it works</h2>
          <p className="text-gray-600 mt-4">
            Three simple steps to find your perfect job match
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
                         hover:shadow-lg transition duration-300"
            >
              <div
                className="w-10 h-10 flex items-center justify-center 
                              bg-black text-white rounded-lg font-bold mb-6"
              >
                {step.id}
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
