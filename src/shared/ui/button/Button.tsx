import { cn } from "@/shared/lib/utils";

import { ButtonProps } from "./button-types";
import { buttonVariants } from "./button-variants";

export function Button({
  variant,
  size,
  rounded,
  width,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          rounded,
          width,
        }),
        className
      )}
      {...props}
    >
      {leftIcon}

      <span>{children}</span>

      {rightIcon}
    </button>
  );
}

// export function Button() {
//   return (
//     <button className="bg-red-500 text-white h-[50px] px-6 rounded-md">
//       تست
//     </button>
//   );
// }