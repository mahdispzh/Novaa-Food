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
    const firstCard = scroller.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const gap = 12; // matches gap-3 (0.75rem)
    const cardWidth = firstCard.getBoundingClientRect().width + gap;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;

    // scrollLeft is inconsistent across browsers in RTL layouts:
    // Chrome/Safari report it as 0 → -maxScroll, Firefox reports it as
    // maxScroll → 0. Normalize both to a plain 0 → maxScroll "distance
    // scrolled from the start" value before dividing by card width.
    const isRTL = getComputedStyle(scroller).direction === "rtl";
    let distanceScrolled = scroller.scrollLeft;
    if (isRTL) {
      distanceScrolled =
        distanceScrolled < 0 ? -distanceScrolled : maxScroll - distanceScrolled;
    }

    const index = Math.round(distanceScrolled / cardWidth);
    setActiveIndex(index);
  }

  return (
    <div className="flex flex-col gap-0">
      <div className="mb-[-25px] flex items-center  right-0">
        <h3 className="mr-3 text-right text-[20px] font-bold text-gray">
          منتخب‌های من
        </h3>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
