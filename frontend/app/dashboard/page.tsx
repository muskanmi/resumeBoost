import StatCard from "./components/StatCard";
import JobCard from "./components/JobCard";
import SidebarCard from "./components/SidebarCard";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <>
      {/* FULL WIDTH NAVBAR */}
      <Navbar />

      {/* FULL WIDTH WHITE BACKGROUND */}
      <div className="min-h-screen bg-white py-10">
        {/* CENTERED CONTENT ONLY */}
        <div className="max-w-6xl mx-auto px-6">
          {/* Welcome Section */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, John! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your job search today
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard
              title="Resume Score"
              value="78%"
              subtitle="+12% from last update"
            />
            <StatCard
              title="Matched Jobs"
              value="24"
              subtitle="New matches this week"
            />
            <StatCard title="Saved Jobs" value="8" subtitle="Ready to apply" />
            <StatCard title="Applications" value="5" subtitle="In progress" />
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Jobs Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top Matched Jobs
              </h2>

              <JobCard
                title="Senior Frontend Developer"
                company="Tech Corp"
                salary="$120k - $150k"
                location="Remote"
                match="92%"
              />

              <JobCard
                title="Full Stack Engineer"
                company="StartupXYZ"
                salary="$130k - $160k"
                location="San Francisco, CA"
                match="88%"
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <SidebarCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
