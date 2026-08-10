import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function HeadsetIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15.6H10"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />

      <path
        d="M3.5 12.6H3C1.6195 12.6 0.5 11.4805 0.5 10.1C0.5 8.71951 1.6195 7.60001 3 7.60001H3.5V12.6Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />

      <path
        d="M13 12.6H12.5V7.60001H13C14.3805 7.60001 15.5 8.71951 15.5 10.1C15.5 11.4805 14.3805 12.6 13 12.6Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />

      <path
        d="M2.5 7.60001V6.10001C2.5 3.06251 4.9625 0.600006 8 0.600006C11.0375 0.600006 13.5 3.06251 13.5 6.10001V7.60001"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />

      <path
        d="M13.5 12.6V14.6C13.5 15.1525 13.0525 15.6 12.5 15.6H11"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}