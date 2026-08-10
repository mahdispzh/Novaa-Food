import { cn } from "@/src/shared/lib/utils";
import { ContainerProps } from "./container.types";

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-2",
        className
      )}
    >
      {children}
    </div>
  );
}