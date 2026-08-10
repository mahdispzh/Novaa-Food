import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function EyeIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="10"
      viewBox="0 0 15 10"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.47556 9.04793C8.77914 9.04793 9.83589 7.99117 9.83589 6.6876C9.83589 5.38403 8.77914 4.32727 7.47556 4.32727C6.17199 4.32727 5.11523 5.38403 5.11523 6.6876C5.11523 7.99117 6.17199 9.04793 7.47556 9.04793Z"
        stroke="currentColor"
        strokeWidth="0.786777"
      />
      <path
        d="M14.5555 6.68758C14.5555 6.68758 13.7688 0.393372 7.47454 0.393372C1.18033 0.393372 0.393555 6.68758 0.393555 6.68758"
        stroke="currentColor"
        strokeWidth="0.786777"
        strokeLinecap="round"
      />
    </svg>
  );
}