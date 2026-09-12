import { cn } from "@/src/shared/lib/utils";

type TextColor = "primary" | "secondary" | "danger" | "white";
type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
type TextWeight = "regular" | "medium" | "bold";

export interface TextProps {
  text: string;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
}

const colorClassMap: Record<TextColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  danger: "text-danger",
  white: "text-white",
};

const sizeClassMap: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightClassMap: Record<TextWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

export function Text({
  text,
  color = "primary",
  size = "md",
  weight = "regular",
  className,
}: TextProps) {
  return (
    <span
      className={cn(
        colorClassMap[color],
        sizeClassMap[size],
        weightClassMap[weight],
        className,
      )}
    >
      {text}
    </span>
  );
}
