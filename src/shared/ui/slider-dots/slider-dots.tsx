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
    <div className={cn(sliderDotsVariants())}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange?.(index)}
          className={cn(
            "transition-all duration-normal",
            index === activeIndex
              ? "h-[6px] w-[24px] rounded-full bg-primary"
              : "h-[6px] w-[6px] rounded-full border border-gray"
          )}
        />
      ))}
    </div>
  );
}