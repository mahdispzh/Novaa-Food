import clsx from "clsx";

import { BadgeProps } from "./badge-types";
import { badgeVariants } from "./badge-variants";

export default function Badge({
  className,
  variant,
  badgeSize,
  rounded,
  clickable,
  leftIcon,
  rightIcon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        badgeVariants({
          variant,
          badgeSize,
          rounded,
          clickable,
        }),
        className
      )}
      {...props}
    >
      {leftIcon && (
        <span className="flex items-center">
          {leftIcon}
        </span>
      )}

      <span>{children}</span>

      {rightIcon && (
        <span className="flex items-center">
          {rightIcon}
        </span>
      )}
    </span>
  );
}