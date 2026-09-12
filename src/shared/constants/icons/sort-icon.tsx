import { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export const SortIcon = ({
  size = "lg",
  color = "text-primary",
  className,
}: IconProps) => {
  return (
    <svg className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`} width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8 7.80005H26M14.8 2.20005H26M14.8 13.4H26M4.99999 0.800049V14.8M9.19999 10.6L4.99999 14.8L0.799988 10.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  
  );
};