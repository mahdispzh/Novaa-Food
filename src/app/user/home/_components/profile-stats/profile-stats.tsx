interface ProfileStat {
  label: string;
  value: string;
}

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="mt-1 flex w-full justify-between text-center">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-0.5">
          <strong className="text-md font-bold">{stat.value}</strong>
          <span className="text-xs text-gray-500">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
