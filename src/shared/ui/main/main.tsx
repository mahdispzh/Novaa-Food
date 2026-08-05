import { cn } from "@/src/shared/lib/utils";
import type { HTMLAttributes } from "react";

export interface MainProps extends HTMLAttributes<HTMLElement> {}

export function Main({ className, children, ...props }: MainProps) {
  return (
    <main
      className={cn(
        "pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
