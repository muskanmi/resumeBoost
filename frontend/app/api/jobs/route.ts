import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetching from Jobicy API (v2) - Free remote jobs
    const response = await fetch("https://jobicy.com/api/v2/remote-jobs?count=10", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch jobs from Jobicy");
    }

    const data = await response.json();
    
    // Map Jobicy format to our JobCard format
    const platforms = ["LinkedIn", "Wellfound", "Naukri", "Instahyre"];
    
    const jobs = (data.jobs || []).map((job: any) => {
      // Construct a direct Search URL
      const encodedTitle = encodeURIComponent(job.jobTitle);
      const encodedCompany = encodeURIComponent(job.companyName);
      
      // Randomly pick a platform for demo variety
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      
      const searchUrl = platform === "LinkedIn" 
        ? `https://www.linkedin.com/jobs/search/?keywords=${encodedTitle}%20${encodedCompany}`
        : `https://www.google.com/search?q=${encodedTitle}%20${encodedCompany}%20at%20${platform}`;

      return {
        id: job.id.toString(),
        title: job.jobTitle,
        company: job.companyName,
        location: job.jobGeo || "Remote",
        salary: job.annualSalaryMin ? `$${job.annualSalaryMin} - $${job.annualSalaryMax}` : "Competitive",
        match: Math.floor(Math.random() * (98 - 85) + 85).toString() + "%",
        platform: platform,
        jobUrl: searchUrl,
        time: "Recent",
      };
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Jobs API Error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
