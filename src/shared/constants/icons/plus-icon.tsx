import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";

export const PlusIcon = ({
  size = "md",
  color = "text-primary",
}: IconProps) => {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4.16797V15.8337M4.16667 9.99967H15.8333"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};
