import { cva } from "class-variance-authority";


export const ratingVariants = cva(
  [
    "flex",
    "items-center",
    "gap-0.5",
  ],
  {
    variants:{
      size:{
        sm:"text-sm",
        md:"text-lg",
        lg:"text-2xl",
      }
    },

    defaultVariants:{
      size:"md"
    }
  }
);