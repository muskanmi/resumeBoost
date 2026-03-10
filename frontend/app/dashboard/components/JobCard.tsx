interface JobCardProps {
  title: string;
  company: string;
  salary: string;
  location: string;
  match: string;
}

export default function JobCard({
  title,
  company,
  salary,
  location,
  match,
}: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="bg-gray-100 text-sm px-3 py-1 rounded-full">
          {match} Match
        </span>
      </div>

      <p className="text-gray-600 mt-2">{company}</p>

      <p className="text-gray-500 text-sm mt-1">
        {location} • {salary}
      </p>

      <div className="flex gap-4 mt-4">
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Apply Now
        </button>

        <button className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
          Save
        </button>
      </div>
    </div>
  );
}
