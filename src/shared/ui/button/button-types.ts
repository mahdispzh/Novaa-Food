import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "link";

export type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "xl";

export type ButtonRounded =
  | "sm"
  | "full";

  export type ButtonWidth =
  | "auto"
  | "full"
  | "small"
  | "medium";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  width?: ButtonWidth;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}