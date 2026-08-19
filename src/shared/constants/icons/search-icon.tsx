import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SearchIcon({ size = "lg", color = "text-primary", className }: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.78353 2.45C7.62446 2.45 9.11686 3.94238 9.11686 5.78333M9.55606 9.55326L12.4502 12.45M11.1169 5.78333C11.1169 8.72886 8.72906 11.1167 5.78353 11.1167C2.83801 11.1167 0.450195 8.72886 0.450195 5.78333C0.450195 2.83781 2.83801 0.449997 5.78353 0.449997C8.72906 0.449997 11.1169 2.83781 11.1169 5.78333Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}