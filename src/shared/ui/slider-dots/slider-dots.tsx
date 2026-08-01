"use client";
import { cn } from "@/src/shared/lib/utils";

import { SliderDotsProps } from "./slider-dots-types";
import { sliderDotsVariants } from "./slider-dots-variants";


export function SliderDots({
  total,
  activeIndex,
  onChange,
}: SliderDotsProps) {

  return (
    <div
      className={cn(
        sliderDotsVariants()
      )}
    >

      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index)}
          className={cn(
            "transition-all",
            "duration-normal",

            index === activeIndex
              ? [
                  "w-10",
                  "h-2",
                  "rounded-full",
                  "bg-primary",
                ]
              : [
                  "w-2",
                  "h-2",
                  "rounded-full",
                  "border",
                  "border-gray",
                ]
          )}
        />
      ))}

    </div>
  );
}