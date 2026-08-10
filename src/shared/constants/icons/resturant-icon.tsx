import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ResturantIcon({ size = "lg", color = "text-primary", className, ...props }: IconProps) {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`}
      {...props}
    >
      <path
        d="M2.21014 1.62363L24.4151 23.8285C24.8364 24.2499 25.0731 24.8214 25.0731 25.4172C25.0731 26.0131 24.8364 26.5846 24.4151 27.0059C23.9936 27.4271 23.4222 27.6637 22.8264 27.6637C22.2305 27.6637 21.6591 27.4271 21.2377 27.0059L15.8135 21.4883C15.4585 21.1278 15.2594 20.6423 15.259 20.1365V19.8032C15.259 19.5477 15.2083 19.2948 15.1098 19.0591C15.0114 18.8235 14.867 18.6097 14.6852 18.4302L13.9849 17.7836C13.7472 17.5642 13.4581 17.4081 13.1442 17.3298C12.8304 17.2514 12.5018 17.2533 12.1889 17.3352C11.6954 17.464 11.1768 17.4615 10.6845 17.3279C10.1923 17.1944 9.74352 16.9345 9.38276 16.574L4.23398 11.4246C1.17954 8.37014 0.0555278 3.75775 2.21014 1.62363Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M22.8536 0.674988L18.1979 5.33077C17.8396 5.68896 17.5554 6.11421 17.3615 6.58225C17.1676 7.05029 17.0678 7.55193 17.0678 8.05854V8.95414C17.0678 9.08085 17.0429 9.20633 16.9944 9.32339C16.9459 9.44046 16.8748 9.54682 16.7852 9.63639L16.1035 10.318"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0322 12.2466L18.7139 11.565C18.8034 11.4753 18.9098 11.4043 19.0269 11.3557C19.1439 11.3072 19.2694 11.2823 19.3961 11.2823H20.2917C20.7983 11.2823 21.3 11.1825 21.768 10.9886C22.236 10.7947 22.6613 10.5105 23.0195 10.1523L27.6753 5.49649"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.2639 3.08575L20.4424 7.90728"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7995 20.9254L4.78946 26.9692C4.33737 27.4211 3.7243 27.675 3.08505 27.675C2.4458 27.675 1.83273 27.4211 1.38064 26.9692C0.928695 26.5171 0.674805 25.904 0.674805 25.2647C0.674805 24.6255 0.928695 24.0124 1.38064 23.5603L6.46011 18.5146"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}