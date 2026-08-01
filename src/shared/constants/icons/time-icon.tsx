import { ICON_SIZE_CLASS } from "../icon-sizes";
import { IconProps } from "@/src/shared/types/IconTypes";

export function TimeIcon({ size = "lg", color = "text-primary", ...props }: IconProps) {
  return (
    <svg
      width="37"
      height="41"
      viewBox="0 0 37 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      {...props}
    >
      <path
        d="M17.4708 23.2941V15.5294M34.9414 9.70588L31.0591 5.82353M13.5885 1.94118H21.3532M17.4708 38.8235C8.89416 38.8235 1.94141 31.8708 1.94141 23.2941C1.94141 14.7175 8.89416 7.76471 17.4708 7.76471C26.0475 7.76471 33.0002 14.7175 33.0002 23.2941C33.0002 31.8708 26.0475 38.8235 17.4708 38.8235Z"
        stroke="currentColor"
        strokeWidth="3.88235"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}