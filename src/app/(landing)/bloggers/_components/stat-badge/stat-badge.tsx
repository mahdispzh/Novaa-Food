import { StatBadgeProps } from "./stat-badge.types";

export default function StatBadge({ icon: Icon, value, label }: StatBadgeProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-light-beige px-3 py-4 text-center">
      <Icon size="lg" color="text-primary" />
      <span className="text-[14px] font-bold text-primary">{value}</span>
      <span className="text-gray text-[11px] whitespace-nowrap">{label}</span>
    </div>
  );
}