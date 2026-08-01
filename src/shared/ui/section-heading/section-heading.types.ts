import { HTMLAttributes } from "react";

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}