import { cn } from "@/shared/lib/utils";
import { cardVariants } from "./card-variants";
import type { CardProps } from "./card-types";


export function Card({
  children,
  variant,
  padding,
  className,
  ...props
}: CardProps) {

  return (
    <div
      className={cn(
        cardVariants({
          variant,
          padding,
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}