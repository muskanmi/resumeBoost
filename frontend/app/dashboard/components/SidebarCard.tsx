export default function SidebarCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
      <h3 className="font-semibold text-gray-900">Quick Actions</h3>

      <button className="w-full border rounded-lg py-2 hover:bg-gray-100">
        Analyze Resume
      </button>

      <button className="w-full border rounded-lg py-2 hover:bg-gray-100">
        Find Jobs
      </button>

      <button className="w-full border rounded-lg py-2 hover:bg-gray-100">
        View Saved Jobs
      </button>
    </div>
  );
}
