import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function UserIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="19"
      viewBox="0 0 14 19"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.79076 17.75C3.53251 17.75 0.75 17.243 0.75 15.2123C0.75 13.1818 3.51486 11.3072 6.79076 11.3072C10.0491 11.3072 12.8316 13.1636 12.8316 15.1942C12.8316 17.224 10.0668 17.75 6.79076 17.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.78417 8.49333C8.92246 8.49333 10.6555 6.76031 10.6555 4.62209C10.6555 2.48386 8.92246 0.75 6.78417 0.75C4.64598 0.75 2.91213 2.48386 2.91213 4.62209C2.90491 6.75309 4.62593 8.48618 6.7569 8.49333C6.76652 8.49333 6.77534 8.49333 6.78417 8.49333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}