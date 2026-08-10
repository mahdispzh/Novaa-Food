import { StatBadgeProps } from "./stat-badge.types";

export default function StatBadge({ icon: Icon, value, label }: StatBadgeProps) {
  return (
    <div className="relative aspect-square flex-1">
      <svg
        viewBox="0 0 108 108"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          opacity="0.5"
          x="18.6636"
          y="-3.95197"
          width="95.2181"
          height="95.2181"
          rx="19.0436"
          transform="rotate(13.6507 18.6636 -3.95197)"
          fill="#8E977D"
        />
        <rect
          y="7.47418"
          width="95.2181"
          height="95.2181"
          rx="19.0436"
          fill="#8E977D"
        />
      </svg>
      {/* the front square sits at y=7.47..102.69 of the 108-tall viewBox (the
         other rect is just the rotated "peeking" shadow behind it) — center
         the content on that square, not the full bounding box */}
      <div
        className="absolute flex flex-col items-center justify-center gap-1 px-2 text-center"
        style={{ left: "0%", top: "6.92%", width: "88.16%", height: "88.16%" }}
      >
        <Icon size="xl" color="text-white" />
        <span className="text-[13px] font-bold text-white">{value}</span>
        <span className="text-[10px] whitespace-nowrap text-white/85">
          {label}
        </span>
      </div>
    </div>
  );
}
