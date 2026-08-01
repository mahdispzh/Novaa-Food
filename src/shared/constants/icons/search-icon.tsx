import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function SearchIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.81912 3.37495C10.2737 3.37495 12.2636 5.3648 12.2636 7.81939M12.8492 12.846L16.708 16.7083M14.9302 7.81939C14.9302 11.7468 11.7465 14.9305 7.81912 14.9305C3.89176 14.9305 0.708008 11.7468 0.708008 7.81939C0.708008 3.89203 3.89176 0.708282 7.81912 0.708282C11.7465 0.708282 14.9302 3.89203 14.9302 7.81939Z"
        stroke="currentColor"
        strokeWidth="1.41657"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}