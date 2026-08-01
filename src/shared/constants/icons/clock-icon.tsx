import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ClockIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="28"
      viewBox="0 0 28 28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7227 26.7222C20.9024 26.7222 26.7227 20.9019 26.7227 13.7222C26.7227 6.54253 20.9024 0.722229 13.7227 0.722229C6.54295 0.722229 0.722656 6.54253 0.722656 13.7222C0.722656 20.9019 6.54295 26.7222 13.7227 26.7222Z"
        stroke="currentColor"
        strokeWidth="1.44444"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7223 5.05554V13.7222H5.05566"
        stroke="currentColor"
        strokeWidth="1.44444"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}