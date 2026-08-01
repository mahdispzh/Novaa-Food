import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "font-medium",
    "transition-colors",
    "whitespace-nowrap",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",

        secondary: "text-white bg-transparent",

        outline: "border border-primary text-primary bg-transparent",

        ghost: "bg-transparent text-primary",
      },

      badgeSize: {
        sm: "h-7 px-3 text-xs",

        md: "h-9 px-4 text-sm",

        lg: "h-11 px-5 text-base",
      },

      rounded: {
        none: "rounded-none",

        sm: "rounded-md",

        md: "rounded-lg",

        lg: "rounded-xl",

        full: "rounded-full",
      },

      clickable: {
        true: "cursor-pointer hover:opacity-80",

        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",

      badgeSize: "md",

      rounded: "full",

      clickable: false,
    },
  }
);