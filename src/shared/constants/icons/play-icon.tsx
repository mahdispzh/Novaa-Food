import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PlayIcon({ size = "lg", color = "text-primary", className }: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      width="35"
      height="40"
      viewBox="0 0 35 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.15 22.5442C35.4167 21.2356 35.4167 17.9639 33.15 16.6552L5.10001 0.460571C2.83334 -0.848087 0 0.787735 0 3.40506L0 35.7944C0 38.4117 2.83333 40.0476 5.1 38.7389L33.15 22.5442Z"
        fill="currentColor"
      />
    </svg>
  );
}