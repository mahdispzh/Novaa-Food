import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",

    "font-medium",
    "whitespace-nowrap",

    "transition-colors",
    "duration-normal",
    "ease-default",

    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary",
    "focus-visible:ring-offset-2",

    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-primary", "text-white", "shadow-sm"],

        outline: ["border", "border-primary", "text-primary", "bg-transparent"],

        link: ["bg-transparent", "text-secondary", "p-0", "shadow-none"],
      },

      size: {
        sm: ["h-[30px]", "text-[13px]"],

        md: ["h-[35px]", "text-sm"],

        xl: ["h-[40px]","text-sm"],

        lg: ["h-[45px]", "text-sm"],
      },

      rounded: {
        sm: "rounded-sm",
        full: "rounded-full",
      },

      width: {
        auto: "w-auto",

        full: "w-full",

        small: "w-[125px]",

        medium: "w-[210px]",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "sm",
      width: "auto",
    },
  },
);
