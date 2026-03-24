import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: IconType;
  progress?: number; // optional progress
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  progress,
}: StatCardProps) {
  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 text-gray-500">
        <span className="text-sm font-medium">{title}</span>

        <div className="bg-gray-100 p-2 rounded-lg">
          <Icon size={16} />
        </div>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
          <div
            className="h-2 bg-black rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Subtitle */}
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
