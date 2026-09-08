interface ProfileStat {
  label: string;
  value: string;
}

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="mt-3 grid grid-cols-3 border-b border-[#ebe7e3] pb-4 text-center">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <strong className="text-sm font-bold">{stat.value}</strong>
          <span className="text-[10px] text-[#817873]">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
