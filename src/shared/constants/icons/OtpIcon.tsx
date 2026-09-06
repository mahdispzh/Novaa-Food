import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function OtpIcon({
  size = "lg",
  color = "text-primary",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="200"
      viewBox="61 18 120 164"
      width="200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      >
        <path d="M61 29C61 22 66 18 73 18H111C118 18 123 22 123 29V171C123 178 118 182 111 182H73C66 182 61 178 61 171V29Z" />
        <path d="M77 20V27C77 31 80 33 84 33H100C104 33 107 31 107 27V20" />
        <path d="M72 151H104" />
        <circle cx="88" cy="166" r="7" />
        <rect height="43" rx="2" width="92" x="89" y="58" />
        <path d="M103 69L113 79M113 69L103 79" />
        <path d="M122 69L132 79M132 69L122 79" />
        <path d="M141 69L151 79M151 69L141 79" />
        <path d="M160 69L170 79M170 69L160 79" />
      </g>
    </svg>
  );
}
