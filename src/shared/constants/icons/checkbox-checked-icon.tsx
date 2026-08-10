import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function CheckboxCheckedIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="15"
      viewBox="0 0 15 15"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="14"
        height="14"
        rx="3.5"
        stroke="currentColor"
      />
      <path
        d="M4 7.33333L6.46154 10L12 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}