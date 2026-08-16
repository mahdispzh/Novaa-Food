import { useState } from "react";
import { GalleryCardData } from "./restaurant-gallery-card-constant";

export default function useGallerySwipe() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    const handleTouchStart = (e: React.TouchEvent) => {
      if (!e.touches[0]) return;

      setStartX(e.touches[0].clientX);
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if(!e.changedTouches[0]) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) < 50) return;

if (diff < 0 && activeIndex < GalleryCardData.length - 1) {
  setActiveIndex(activeIndex + 1);
}

if (diff > 0 && activeIndex > 0) {
  setActiveIndex(activeIndex - 1);
}
  };

  return {
    activeIndex,
    setActiveIndex,
    handleTouchStart,
    handleTouchEnd,
  };
}
