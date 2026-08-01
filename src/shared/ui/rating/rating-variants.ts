import { cva } from "class-variance-authority";


export const ratingVariants = cva(
  [
    "flex",
    "items-center",
    "gap-1",
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