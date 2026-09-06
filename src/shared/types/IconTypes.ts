import type { ICON_SIZE_CLASS } from "@/src/shared/constants/icon-sizes";
import type { CSSProperties } from "react";

export type IconSize = keyof typeof ICON_SIZE_CLASS;

export interface IconProps {
  size?: IconSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}
