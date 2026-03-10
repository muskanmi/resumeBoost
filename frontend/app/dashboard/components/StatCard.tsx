interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
