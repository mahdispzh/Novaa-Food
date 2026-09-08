import type { IconProps } from "@/src/shared/types/IconTypes";
import { ICON_SIZE_CLASS } from "../icon-sizes";

export function ExitIcon({ size = "lg", color = "text-primary", className }: IconProps) {
  return (
<svg className={`${ICON_SIZE_CLASS[size]} ${color} ${className ?? ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.0874 0.399902H2.2749C1.23934 0.399902 0.399902 1.23937 0.399902 2.2749V13.5249C0.399902 14.5605 1.23934 15.3999 2.2749 15.3999H5.0874M11.6499 11.6499L15.3999 7.8999L11.6499 4.1499M15.3999 7.8999H4.1499" stroke="#301F18" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
}