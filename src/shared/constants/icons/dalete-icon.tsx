import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function DeleteIcon({ size = "lg", color = "text-primary", className,onClick }: IconProps) {
  return (
<svg className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`} width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.02539 9.39941V14.3999" stroke="#301F18" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.77539 9.39941V14.3999" stroke="#301F18" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.399902 4.3999H15.3999" stroke="#301F18" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.2749 7.3999V15.4C2.2749 17.057 3.53411 18.4001 5.0874 18.4001H10.7124C12.2657 18.4001 13.5249 17.057 13.5249 15.4V7.3999" stroke="#301F18" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.0874 2.40011C5.0874 1.29542 5.9268 0.399902 6.96224 0.399902H8.83708C9.87256 0.399902 10.7119 1.29542 10.7119 2.40011V4.40031H5.0874V2.40011Z" stroke="#301F18" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}