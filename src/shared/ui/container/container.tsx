import { cn } from "@/shared/lib/utils";
import { ContainerProps } from "./container-types";
import { containerVariants } from "./container-variants";


export function Container({
  children,
  className,
}: ContainerProps) {

  return (
    <div
      className={cn(
        containerVariants(),
        className
      )}
    >
      {children}
    </div>
  );
}