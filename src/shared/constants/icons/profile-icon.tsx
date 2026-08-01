import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ProfileIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="33"
      viewBox="0 0 27 33"
      width="27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 32C1 25.3419 6.59645 19.9444 13.5 19.9444C20.4036 19.9444 26 25.3419 26 32M20.6429 7.88889C20.6429 11.6935 17.4448 14.7778 13.5 14.7778C9.55511 14.7778 6.35714 11.6935 6.35714 7.88889C6.35714 4.08426 9.55511 1 13.5 1C17.4448 1 20.6429 4.08426 20.6429 7.88889Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}