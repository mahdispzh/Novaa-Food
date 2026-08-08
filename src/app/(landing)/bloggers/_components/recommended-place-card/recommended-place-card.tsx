import Image from "next/image";
import Link from "next/link";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import recommendedFrame from "../../_assets/frames/recommended-frame.svg";
import { frameMaskStyle } from "../../_utils/frame-mask";
import { RecommendedPlaceCardProps } from "./recommended-place-card.types";

export default function RecommendedPlaceCard({
  place,
}: RecommendedPlaceCardProps) {
  return (
    <Link
      href={`/restaurants/${place.slug}`}
      className="relative block w-full flex-shrink-0 snap-center"
    >
      {/* frame: aspect matches the native recommended-frame.svg (370x203) */}
      <div className="relative aspect-[370/203] w-full">
        <div
          className="bg-primary absolute inset-0"
          style={frameMaskStyle(recommendedFrame)}
        />

        <div className="absolute inset-0 flex items-stretch p-3">
          <div className="relative h-full w-[45%] shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={place.image}
              alt={place.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 text-right">
            <div className="flex items-center justify-end gap-1">
              <span className="truncate text-[15px] font-bold text-white">
                {place.name}
              </span>
              <span className="flex shrink-0 items-center gap-1 text-[12px] text-white">
                <ICONS.starIcon size="xs" color="text-white" />
                {place.rating}
              </span>
            </div>

            {place.address && (
              <p className="truncate text-[11px] text-white/80">
                {place.address}
              </p>
            )}

            {place.hours && (
              <p className="truncate text-[11px] text-white/80">
                {place.hours}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
