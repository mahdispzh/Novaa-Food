import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-1",
    "font-medium",
    "transition-colors",
    "whitespace-nowrap",
    "select-none",
    "leading-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",

        secondary: "text-white bg-transparent",

        outline: "border border-primary text-primary bg-transparent",

        ghost: "bg-transparent text-primary",

        secondaryText :  "bg-transparent text-secondary",
      },

      badgeSize: {
        xs: "h-5  text-[10px]",

        sm: "h-7  text-xs",

        md: "h-9  text-sm",

        lg: "h-11 text-base",
      },

      width: {
        auto: "w-fit",

        sm: "w-20",

        md: "w-32",

        lg: "w-40",
        
        full: "w-full",
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
  },
);
