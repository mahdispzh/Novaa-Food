import { VariantProps } from "class-variance-authority";
import { cardVariants } from "./card-variants";
import { HTMLAttributes } from "react";

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}