import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ChevronDownIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="3"
      viewBox="0 0 9 3"
      width="9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.40039 0.400085L4.40039 2.40009L0.400391 0.400086"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
      />
    </svg>
  );
}