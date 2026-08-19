import clsx from "clsx";

import { inputVariants } from "./input-variants";
import { InputProps } from "./input.types";

export default function Input({
  className,
  variant,
  inputSize,
  rounded,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(
        inputVariants({
          variant,
          inputSize,
          rounded,
        }),
        "flex items-center gap-2",
        className
      )}
    >
      {leftIcon}

      <input
        className="flex-1 bg-transparent outline-none placeholder:text-primary-75"
        {...props}
      />

      {rightIcon}
    </div>
  );
}