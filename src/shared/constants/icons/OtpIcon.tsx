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
      viewBox="45 18 136 164"
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
        <path d="M48 29C48 22 54 18 61 18H123C130 18 136 22 136 29V171C136 178 130 182 123 182H61C54 182 48 178 48 171V29Z" />
        <path d="M67 20V27C67 31 70 33 74 33H110C114 33 117 31 117 27V20" />
        <path d="M59 151H125" />
        <circle cx="92" cy="166" r="7" />
        <rect height="43" rx="2" width="92" x="89" y="58" />
        <path d="M103 69L113 79M113 69L103 79" />
        <path d="M122 69L132 79M132 69L122 79" />
        <path d="M141 69L151 79M151 69L141 79" />
        <path d="M160 69L170 79M170 69L160 79" />
      </g>
    </svg>
  );
}
