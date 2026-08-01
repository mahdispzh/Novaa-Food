import { cva } from "class-variance-authority";


export const tabVariants = cva(
  [
    "relative",
    "h-10",
    "px-4",
    "font-regular",
    "text-sm",
    "transition-colors",
    "duration-normal",
  ],
  {
    variants: {
      active: {
        true: [
          "text-primary",
          "after:absolute",
          "after:bottom-0",
          "after:left-0",
          "after:h-[2px]",
          "after:w-full",
          "after:bg-primary",
        ],

        false: [
          "text-primary-75",
        ],
      },
    },

    defaultVariants:{
      active:false,
    }
  }
);