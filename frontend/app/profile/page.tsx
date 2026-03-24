"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUploadCloud,
  FiSave,
  FiPlus,
  FiTrash2,
  FiLogOut,
  FiBell,
  FiShield,
  FiBriefcase,
  FiBookOpen,
  FiLock,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const tabs = ["Personal Info", "Professional", "Notifications", "Security"];

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("Personal Info");
  
  // -- State for tabs --
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate software engineer with 8+ years of experience in building modern web applications.",
  });

  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "AWS", "GraphQL"]);
  const [skillInput, setSkillInput] = useState("");

  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    appUpdates: true,
    newsletter: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  const removeSkill = (s: string) => setSkills(skills.filter((sk) => sk !== s));
  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center font-medium text-gray-400">
        Loading...
      </div>
    </>
  );

  return (
    <>
      <Navbar />

      {!user ? (
        <div className="min-h-screen bg-white flex items-center justify-center font-medium text-gray-400">
          Redirecting to login...
        </div>
      ) : (
        <div className="min-h-screen bg-white py-10">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-500 mt-1">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Segmented Control (Tabs) */}
            <div className="mb-8">
              <div className="flex bg-gray-100 p-1 rounded-xl w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                      activeTab === tab
                        ? "bg-white shadow text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Card */}
            <div className="border rounded-2xl p-8 bg-white">
              {/* ===================== */}
              {/* PERSONAL INFO */}
              {/* ===================== */}
              {activeTab === "Personal Info" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Update your personal details and contact information
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold uppercase">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                        <FiUploadCloud />
                        Upload Photo
                      </button>
                      <p className="text-xs text-gray-400 mt-2">
                        JPG, PNG or GIF (max. 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-gray-100 rounded-xl p-4 text-sm outline-none focus:ring-1 focus:ring-black resize-none"
                    />
                  </div>

                  <div>
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition shadow-sm">
                      <FiSave />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* ===================== */}
              {/* PROFESSIONAL */}
              {/* ===================== */}
              {activeTab === "Professional" && (
                <div className="space-y-10">
                  {/* Skills Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 leading-tight">Skills</h2>
                    <p className="text-sm text-gray-500 mb-6">Add and manage your professional skills</p>
                    
                    <div className="flex gap-3 mb-6 max-w-2xl">
                      <input
                        type="text"
                        placeholder="Add a skill..."
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        className="flex-1 bg-gray-100 rounded-xl px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-black"
                      />
                      <button
                        onClick={addSkill}
                        className="bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2"
                      >
                        <FiPlus />
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 bg-gray-100 border text-gray-700 px-3 py-1.5 rounded-lg text-sm transition hover:bg-gray-200 group"
                        >
                          {skill}
                          <FiX
                            className="cursor-pointer text-gray-400 group-hover:text-red-500 transition"
                            onClick={() => removeSkill(skill)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Work Experience */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">Work Experience</h2>
                        <p className="text-sm text-gray-500">Your professional work history</p>
                      </div>
                      <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50">
                        <FiPlus size={16} />
                        Add Experience
                      </button>
                    </div>

                    <div className="bg-white border rounded-2xl p-6 relative group transition hover:border-gray-300">
                      <button className="absolute top-6 right-6 text-red-500 hover:text-red-700 transition lg:opacity-0 lg:group-hover:opacity-100">
                        <FiTrash2 size={18} />
                      </button>
                      <h3 className="font-bold text-gray-900">Senior Frontend Developer</h3>
                      <p className="text-sm text-gray-600 mt-0.5">Tech Corp</p>
                      <p className="text-xs text-gray-400 mt-1 mb-4">2020 - Present</p>
                      <p className="text-sm text-gray-600">Leading frontend development team</p>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Education */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">Education</h2>
                        <p className="text-sm text-gray-500">Your educational background</p>
                      </div>
                      <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50">
                        <FiPlus size={16} />
                        Add Education
                      </button>
                    </div>

                    <div className="bg-white border rounded-2xl p-6 relative group transition hover:border-gray-300">
                      <button className="absolute top-6 right-6 text-red-500 hover:text-red-700 transition lg:opacity-0 lg:group-hover:opacity-100">
                        <FiTrash2 size={18} />
                      </button>
                      <h3 className="font-bold text-gray-900">Bachelor of Computer Science</h3>
                      <p className="text-sm text-gray-600 mt-0.5">University of Technology</p>
                      <p className="text-xs text-gray-400 mt-1">2012 - 2016</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== */}
              {/* NOTIFICATIONS */}
              {/* ===================== */}
              {activeTab === "Notifications" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 leading-tight">Notification Preferences</h2>
                    <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                  </div>

                  <div className="space-y-6 max-w-2xl">
                    {[
                      {
                        id: "jobAlerts",
                        title: "Job Match Alerts",
                        desc: "Get notified when new jobs match your profile",
                        icon: FiBell,
                      },
                      {
                        id: "appUpdates",
                        title: "Application Updates",
                        desc: "Updates on your job applications",
                        icon: FiBriefcase,
                      },
                      {
                        id: "newsletter",
                        title: "Newsletter",
                        desc: "Weekly career tips and insights",
                        icon: FiMail,
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                            <item.icon size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        
                        {/* Toggle Switch */}
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${
                            notifications[item.id as keyof typeof notifications] ? "bg-black" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${
                              notifications[item.id as keyof typeof notifications] ? "translate-x-6" : ""
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                      <FiSave />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* ===================== */}
              {/* SECURITY */}
              {/* ===================== */}
              {activeTab === "Security" && (
                <div className="space-y-10">
                  {/* Change Password */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 leading-tight">Change Password</h2>
                    <p className="text-sm text-gray-500 mb-8">Update your account password</p>

                    <div className="space-y-6 max-w-2xl">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <input
                          type="password"
                          className="w-full bg-gray-100 rounded-xl py-3 px-5 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input
                          type="password"
                          className="w-full bg-gray-100 rounded-xl py-3 px-5 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full bg-gray-100 rounded-xl py-3 px-5 text-sm outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>
                      
                      <div>
                        <button className="bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
                          <FiShield />
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Danger Zone */}
                  <div className="border border-red-200 bg-red-50/20 rounded-2xl p-8">
                    <h2 className="text-lg font-bold text-red-600 leading-tight">Danger Zone</h2>
                    <p className="text-sm text-red-500 mb-6 font-medium">Permanent actions that cannot be undone</p>
                    
                    <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-red-700 transition">
                      <FiTrash2 />
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Section */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-full text-sm font-bold transition border border-transparent hover:border-red-100"
              >
                <FiLogOut />
                Logout from Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
