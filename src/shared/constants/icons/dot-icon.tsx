import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DotIcon({ size = "lg", color = "text-primary", className }: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.5" cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
    </svg>
  );
}
