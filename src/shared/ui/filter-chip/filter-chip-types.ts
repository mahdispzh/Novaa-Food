import { ButtonHTMLAttributes, ReactNode } from "react";

export type FilterChipSize =
  | "sm"
  | "md"
  | "lg";

export interface FilterChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  size?: FilterChipSize;
}