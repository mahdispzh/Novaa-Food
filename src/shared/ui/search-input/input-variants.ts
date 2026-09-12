import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full",
    "outline-none",
    "transition-colors",
    "placeholder:text-primary",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        outline:
          "border border-primary bg-transparent focus-within:border-primary",
        filled:
          "bg-light-beige border border-transparent focus-within:border-primary",
      },

      inputSize: {
        sm: "h-10 px-3 text-sm",
        md: "h-12 px-4 text-base",
        lg: "h-14 px-5 text-lg",
        mapSize : "h-10 px-5 w-50 text-lg"
      },

      rounded: {
        none: "rounded-none",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },

    defaultVariants: {
      variant: "outline",
      inputSize: "md",
      rounded: "full",
    },
  }
);