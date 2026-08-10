import { ComponentType } from "react";

import { IconProps } from "@/src/shared/types/IconTypes";

export interface StatBadgeProps {
  icon: ComponentType<Partial<IconProps>>;
  value: string;
  label: string;
}