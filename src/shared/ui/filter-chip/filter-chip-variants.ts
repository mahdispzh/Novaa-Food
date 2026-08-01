import { cva } from "class-variance-authority";


export const filterChipVariants = cva(
[
 "inline-flex",
 "items-center",
 "justify-center",
 "gap-2",
 "h-[25px]",
 "px-4",
 "rounded-full",
 "border",
 "border-gray",
 "text-secondary",
 "text-xs",
],
{
  variants:{
    size:{
      sm:"w-[100px]",
      md:"w-[140px]",
      lg:"w-[155px]",
    }
  },

  defaultVariants:{
    size:"sm"
  }
});