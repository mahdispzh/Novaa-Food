import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SortDescendingIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="15"
      viewBox="0 0 27 15"
      width="27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 7.5H25.7M14.5 1.9H25.7M14.5 13.1H25.7M4.7 0.5V14.5M8.9 10.3L4.7 14.5L0.5 10.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}