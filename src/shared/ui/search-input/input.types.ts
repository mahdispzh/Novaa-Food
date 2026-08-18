import { InputHTMLAttributes, ReactNode } from "react";
import { VariantProps } from "class-variance-authority";

import { inputVariants } from "./input-variants";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}