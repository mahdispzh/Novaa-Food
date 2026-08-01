import { cva } from "class-variance-authority";

export const breadcrumbVariants = cva([
  "flex",
  "items-center",
  "flex-wrap",
  "gap-2",
  "text-sm",
]);

export const breadcrumbItemVariants = cva(
  [
    "transition-colors",
    "duration-normal",
  ],
  {
    variants: {
      active: {
        true: [
          "text-primary",
          "font-medium",
        ],
        false: [
          "text-gray",
        ],
      },
    },

    defaultVariants: {
      active: false,
    },
  }
);