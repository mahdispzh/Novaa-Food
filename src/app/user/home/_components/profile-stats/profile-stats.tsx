import Link from "next/link";

interface ProfileStat {
  label: string;
  value: string;
  href?: string;
}

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="mt-1 flex w-full justify-between text-center">
      {stats.map((stat) => {
        const content = (
          <div className="flex flex-col gap-0.5">
            <strong className="text-sm font-bold">{stat.value}</strong>
            <span className="text-[10px] text-gray-500">{stat.label}</span>
          </div>
        );

        return stat.href ? (
          <Link key={stat.label} href={stat.href}>
            {content}
          </Link>
        ) : (
          <div key={stat.label}>{content}</div>
        );
      })}
    </div>
  );
}