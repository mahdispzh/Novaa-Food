import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SaveIcon({ size = "lg", color = "text-primary" }: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="13"
      viewBox="0 0 11 13"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 2.8151V11.2716C10.5 12.351 9.75714 12.805 8.85 12.284L6.04286 10.6537C5.74286 10.4825 5.25714 10.4825 4.95714 10.6537L2.15 12.284C1.24286 12.805 0.5 12.351 0.5 11.2716V2.8151C0.5 1.54216 1.49999 0.5 2.72142 0.5H8.27857C9.5 0.5 10.5 1.54216 10.5 2.8151Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
