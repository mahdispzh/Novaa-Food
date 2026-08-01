import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function RoundedSquareIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="15"
      viewBox="0 0 15 15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="14"
        opacity="0.5"
        rx="3.5"
        stroke="currentColor"
        width="14"
        x="0.5"
        y="0.5"
      />
    </svg>
  );
}