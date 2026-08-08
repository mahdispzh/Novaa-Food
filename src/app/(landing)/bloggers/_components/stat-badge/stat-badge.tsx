import statBadgeFrame from "../../_assets/frames/stat-badge-frame.svg";
import { frameMaskStyle } from "../../_utils/frame-mask";
import { StatBadgeProps } from "./stat-badge.types";

export default function StatBadge({ icon: Icon, value, label }: StatBadgeProps) {
  return (
    <div className="relative aspect-square flex-1">
      <div
        className="bg-primary absolute inset-0"
        style={frameMaskStyle(statBadgeFrame)}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-1 px-2 text-center">
        <Icon size="md" color="text-white" />
        <span className="text-[13px] font-bold text-white">{value}</span>
        <span className="text-[10px] whitespace-nowrap text-white/85">
          {label}
        </span>
      </div>
    </div>
  );
}
