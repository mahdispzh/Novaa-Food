import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function PhoneIcon({
  size = "lg",
  color = "text-primary",
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color}`}
      fill="none"
      height="17"
      viewBox="0 0 17 17"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.93262 0.600037C8.93262 0.600037 10.7659 0.766704 13.0992 3.10005C15.4325 5.43339 15.5992 7.26673 15.5992 7.26673"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />

      <path
        d="M9.10547 3.54626C9.10547 3.54626 9.93045 3.78197 11.1678 5.01941C12.4052 6.25686 12.641 7.08182 12.641 7.08182"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />

      <path
        d="M5.63086 3.36366L6.17168 4.33277C6.65976 5.20734 6.46384 6.35463 5.69511 7.12337C5.69511 7.12337 4.76277 8.05587 6.45326 9.74646C8.14323 11.4365 9.0763 10.5046 9.0763 10.5046C9.84503 9.73588 10.9923 9.53996 11.8668 10.028L12.8359 10.5689C14.1565 11.3059 14.3125 13.1579 13.1517 14.3187C12.4542 15.0162 11.5998 15.559 10.6552 15.5947C9.06513 15.6551 6.36476 15.2527 3.65597 12.5438C0.947213 9.83496 0.544787 7.13455 0.605069 5.54443C0.640877 4.59986 1.1836 3.74538 1.8811 3.04787C3.04187 1.88708 4.89384 2.04305 5.63086 3.36366Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}
