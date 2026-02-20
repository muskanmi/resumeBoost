import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-black">Your AI-Powered</span>
            <br />
            <span className="text-blue-600">
              Career
              <br /> Accelerator
            </span>
          </h1>

          <p className="text-gray-600 mb-8">
            ResumeBoost uses advanced AI embeddings to match
            <br /> your unique profile with the perfect job opportunities,
            <br />
            maximizing your interview chances.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-bold 
             transition-transform duration-300 ease-out
             hover:-translate-y-1 hover:shadow-lg"
          >
            Get Started Free
            <FaArrowRight className="ml-2" />
          </Link>

          <Link
            href="/register"
            className="border-2 border-slate-400 text-slate-800 px-6 py-3 ml-4 rounded-full font-semibold hover:text-white transition"
          >
            Learn More
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/images/hero-image.png"
            alt="AI Resume Matching"
            width={700}
            height={600}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
