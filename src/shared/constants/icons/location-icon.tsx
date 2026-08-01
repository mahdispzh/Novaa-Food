import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function LocationIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="27"
      viewBox="0 0 22 27"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6111 26.5C15.6667 21.3 20.7222 16.6437 20.7222 10.9C20.7222 5.15624 16.1953 0.5 10.6111 0.5C5.0269 0.5 0.5 5.15624 0.5 10.9C0.5 16.6437 5.55556 21.3 10.6111 26.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6107 14.9446C13.004 14.9446 14.944 13.0045 14.944 10.6112C14.944 8.218 13.004 6.27789 10.6107 6.27789C8.21738 6.27789 6.27734 8.218 6.27734 10.6112C6.27734 13.0045 8.21738 14.9446 10.6107 14.9446Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}