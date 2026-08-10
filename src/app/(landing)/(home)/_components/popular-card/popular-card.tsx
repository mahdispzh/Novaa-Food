"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Image from "next/image";
import popularCardShape from "@/src/shared/ui/assets/shapes/popular-card.svg";
import popularCardImage from "../popular-card/popular-card-image.svg"
import Badge from "../../../../../shared/ui/Badge/Badge";
import { popularCardProps } from "./popular-card-types";

const {
  starIcon: StarIcon,
  locationIcon: LocationIcon,
  typeIcon: TypeIcon,
} = ICONS;

export default function PopularCard({
  title,
  location,
  image,
  rating,
  category,
  reviewsCount,
}: popularCardProps) {
  return (
    <div className="relative h-[360px] w-[300px] shrink-0">
      {/* shape */}
      <Image src={popularCardShape} alt="" fill className="object-contain" />

      <div className="flex flex-col">
        <div className="absolute right-11 top-6 flex flex-col">
          {/* title */}
          <p className="text-[12px] text-beige font-light">{title}</p>

          {/* rating */}
          <div className="flex items-center">

             <Badge
            variant="ghost"
            badgeSize="xs"
            leftIcon={<StarIcon size="xs" color="text-primary" />}
          >
            {rating}
          </Badge>
          <span className="text-[9px] text-primary">({reviewsCount} نظر)</span>

          </div>
         
        </div>
        {/* category */}
        <div className="absolute right-59 top-4 z-20 flex flex-col items-center justify-center gap-1 text-white">
          <TypeIcon size="lg" color="text-white" />
          <span className="text-[10px] font-light">{category}</span>
        </div>

        {/* image */}
        <div className="absolute top-25  h-[220px] w-[300px]">
          <Image src={popularCardImage} alt="" fill className="object-contain" />
        </div>

        {/* location */}
        <div className="absolute top-83 right-10 flex items-center gap-1">
          <LocationIcon size="xs" color="text-white" />
          <span className="text-[10px] text-beige font-light">{location}</span>
        </div>
      </div>
    </div>
  );
}
