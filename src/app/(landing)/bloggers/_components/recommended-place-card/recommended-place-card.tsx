import Image from "next/image";
import Link from "next/link";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import { RecommendedPlaceCardProps } from "./recommended-place-card.types";

export default function RecommendedPlaceCard({
  place,
}: RecommendedPlaceCardProps) {
  return (
    <Link
      href={`/restaurants/${place.slug}`}
      className="flex w-40 flex-shrink-0 flex-col overflow-hidden rounded-2xl bg-white"
    >
      <div className="relative h-24 w-full">
        <Image src={place.image} alt={place.name} fill className="object-cover" />
      </div>
      <div className="flex items-center justify-between p-2">
        <span className="text-[13px] font-bold text-primary">{place.name}</span>
        <span className="flex items-center gap-1 text-[12px] text-primary">
          <ICONS.starIcon size="xs" color="text-primary" />
          {place.rating}
        </span>
      </div>
    </Link>
  );
}