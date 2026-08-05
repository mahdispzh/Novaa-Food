"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import nearByCardShape from "@/src/shared/ui/assets/shapes/near-by-card.svg";
import Image from "next/image";
import Badge from "../../../../../shared/ui/Badge/Badge";
import { nearByCardProps } from "./near-by-card-types";

const {
  starIcon: StarIcon,
  locationIcon: LocationIcon,
  typeIcon: TypeIcon,
} = ICONS;

export default function NearByCard({
  title,
  location,
  rating,
  image,
  category,
}: nearByCardProps) {
  return (
    <div className="relative h-[320px] w-[300px]">
      {/* Shape */}
      <Image src={nearByCardShape} alt="" fill className="object-contain" />

      <div className="flex flex-col gap-3">
        {/* عکس کافه */}

        <div className="absolute top-4 right-6 left-4 h-[170px] w-[250px]">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-3xl object-cover"
          />
        </div>

        <div className="absolute top-60 right-30 flex justify-between gap-5">
          {/* title */}

          <h5 className="text-beige">{title}</h5>

          {/* Rating */}
          <div className="absolute -left-25 flex gap-1 items-center">
            <Badge variant="secondary" badgeSize="sm">
              {rating}
            </Badge>
            <StarIcon size="xs" color="text-beige" />
          </div>
        </div>

        {/* category */}
        <div className="absolute top-65 right-10 z-20 flex flex-col items-center justify-center gap-1 text-beige">
          <TypeIcon size="xl" color="text-beige" />
          <span className="text-beige text-xs font-light">{category}</span>
        </div>

        {/* location */}
        <div className="absolute top-70 right-30 flex items-center gap-1">
          <LocationIcon size="sm" color="text-beige" />
          <p className="text-sm font-light">{location}</p>
        </div>
      </div>
    </div>
  );
}
