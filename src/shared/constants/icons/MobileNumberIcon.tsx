import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function MobileNumberIcon({
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
      viewBox="45 22 113 156"
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
        <rect height="156" rx="14" width="78" x="45" y="22" />
        <path d="M45 48H123" />
        <path d="M78 35H90" />
        <circle cx="105" cy="35" fill="currentColor" r="2.5" stroke="none" />
        <path d="M45 151H123" />
        <circle cx="84" cy="164" r="8" />
        <path
          d="M82 63H153C156 63 158 65 158 68V105C158 108 156 110 153 110H103L88 125V110H82C79 110 77 108 77 105V68C77 65 79 63 82 63Z"
          fill="none"
        />
        <path d="M91 78H112" />
        <path d="M91 92H143" />
      </g>
    </svg>
  );
}
