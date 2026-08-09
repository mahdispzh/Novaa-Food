import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function HeartIcon({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) {
  return (
    <svg
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      fill="none"
      height="30"
      viewBox="0 0 28 30"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5671 24.5048H21.4693C20.3137 24.5048 19.2159 24.939 18.4071 25.7235L15.9371 28.091C14.8104 29.1697 12.9759 29.1697 11.8493 28.091L9.37928 25.7235C8.57039 24.939 7.45817 24.5048 6.31706 24.5048H5.23372C2.83595 24.5048 0.900391 22.6416 0.900391 20.3442V5.06058C0.900391 2.76315 2.83595 0.900024 5.23372 0.900024H22.5671C24.9648 0.900024 26.9004 2.76315 26.9004 5.06058V20.3442C26.9004 22.6276 24.9648 24.5048 22.5671 24.5048Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.8"
      />
      <path
        d="M14.3048 19.0414C14.0882 19.1114 13.7271 19.1114 13.4959 19.0414C11.6182 18.411 7.40039 15.8193 7.40039 11.4066C7.40039 9.45938 9.01817 7.89038 11.0115 7.89038C12.1959 7.89038 13.2359 8.43672 13.9004 9.29126C14.5648 8.43672 15.6048 7.89038 16.7893 7.89038C18.7826 7.89038 20.4004 9.45938 20.4004 11.4066C20.3859 15.8193 16.1826 18.411 14.3048 19.0414Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}