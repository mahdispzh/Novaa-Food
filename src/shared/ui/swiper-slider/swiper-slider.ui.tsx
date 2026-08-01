"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperNavButton } from "../swiper-nav-button/swiper-nav-button.ui";
import type { SwiperSliderProps } from "./swiper-slider.types";
import { useSwiperSlider } from "./useSwiperSlider";

export function SwiperSlider({
  sliderId,
  children,
  className = "",
  showNavigation = true,
  compact = false,

  onSwiper,
  onSlideChange,

  ...swiperProps
}: SwiperSliderProps) {
  const { isBeginning, isEnd, handleSwiper, handleSlideChange } =
    useSwiperSlider();

  return (
    <div className={`relative px-4 sm:px-10 md:px-20 ${className}`}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.next-${sliderId}`,
          nextEl: `.prev-${sliderId}`,
        }}
        onSwiper={(swiper) => {
          handleSwiper(swiper);
          onSwiper?.(swiper);
        }}
        onSlideChange={(swiper) => {
          handleSlideChange(swiper);
          onSlideChange?.(swiper);
        }}
        {...swiperProps}
      >
        {children}
      </Swiper>

      <div className="hidden lg:block">
        {showNavigation && (
          <>
            <SwiperNavButton
              direction="left"
              icon
              className={`prev-${sliderId}`}
              disabled={isEnd}
            />

            <SwiperNavButton
              direction="right"
              icon
              className={`next-${sliderId}`}
              disabled={isBeginning}
            />
          </>
        )}
      </div>
    </div>
  );
}