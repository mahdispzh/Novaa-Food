"use client";

import GalleryCard from "./restaurant-gallery-card";
import { GalleryCardData } from "./restaurant-gallery-card-constant";
import { SliderDots } from "@/src/shared/ui";
import useGallerySwipe from "./use-restaurant-gallery";

export default function RestaurantGallery() {
  const {
    activeIndex,
    setActiveIndex,
    handleTouchStart,
    handleTouchEnd,
  } = useGallerySwipe();

  return (
    <div className="relative mb-10">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <GalleryCard {...GalleryCardData[activeIndex]} />
      </div>

      <div className="mt-5 flex justify-center">
        <SliderDots
          total={GalleryCardData.length}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />
      </div>
    </div>
  );
}