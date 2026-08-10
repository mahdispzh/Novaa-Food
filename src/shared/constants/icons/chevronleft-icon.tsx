import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ChevronLeftIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
        className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
        width="5" 
        height="13" 
        viewBox="0 0 5 13" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path 
            d="M3.6 11.6001L0.6 6.1001L3.6 0.600098" 
            stroke="currentColor"
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>

  );
}