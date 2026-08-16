"use client";

import { useState } from "react";
import GalleryCard from "./restaurant-gallery-card";
import { GalleryCardData } from "./restaurant-gallery-card-constant";
import { SliderDots } from "@/src/shared/ui";

export default function RestaurantGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative mb-10">
      <GalleryCard {...GalleryCardData[activeIndex]} />
      <div className="mt-5 justtify-center">
      <SliderDots
        total={GalleryCardData.length}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />
      </div>

    </div>
  );
}