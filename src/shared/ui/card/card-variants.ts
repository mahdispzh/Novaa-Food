import { cva } from "class-variance-authority";

export const cardVariants = cva(
  [
    "rounded-2xl",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: "bg-white",
        outline: "border border-gray-200 bg-red-500",
      },

      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },

    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);