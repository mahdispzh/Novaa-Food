"use client";

import { useRef, useState } from "react";

import { BloggerRecommendedPlace } from "../../_types/blogger.types";
import RecommendedPlaceCard from "../recommended-place-card/recommended-place-card";

interface RecommendedPlacesCarouselProps {
  places: BloggerRecommendedPlace[];
}

export default function RecommendedPlacesCarousel({
  places,
}: RecommendedPlacesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveIndex(index);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto"
      >
        {places.map((place) => (
          <RecommendedPlaceCard key={place.id} place={place} />
        ))}
      </div>

      {places.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {places.map((place, index) => (
            <span
              key={place.id}
              className={
                index === activeIndex
                  ? "bg-primary h-1.5 w-4 rounded-full transition-all"
                  : "bg-primary/30 h-1.5 w-1.5 rounded-full transition-all"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
