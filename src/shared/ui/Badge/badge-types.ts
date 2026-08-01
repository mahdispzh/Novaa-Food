import { HTMLAttributes, ReactNode } from "react";
import { VariantProps } from "class-variance-authority";

import { badgeVariants } from "./badge-variants";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}