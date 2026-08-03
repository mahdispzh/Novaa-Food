"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Image from "next/image";
import popularCardShape from "../assets/svg/popular-card.svg";
import popularCardImage from "../popular-card/popular-card-image.svg"
import Badge from "../Badge/Badge";
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
    <div className="relative h-[280px] w-[260px]">
      {/* shape */}
      <Image src={popularCardShape} alt="" fill className="object-contain" />

      <div className="flex flex-col">
        <div className="absolute right-11 top-4 flex flex-col">
          {/* title */}
          <p className="text-[10px]">{title}</p>

          {/* rating */}
          <div className="flex items-center">

             <Badge
            variant="ghost"
            badgeSize="xs"
            leftIcon={<StarIcon size="xs" color="text-primary" />}
          >
            {rating}
          </Badge>
          <span className="text-[7px] text-primary">({reviewsCount} نظر)</span>

          </div>
         
        </div>
        {/* category */}
        <div className="absolute right-46 top-3 z-20 flex flex-col items-center justify-center gap-1 text-white">
          <TypeIcon size="md" color="text-white" />
          <span className="text-[10px] font-light">{category}</span>
        </div>

        {/* image */}
        <div className="absolute top-20 right-4 left-4 h-[170px]">
          <Image src={popularCardImage} alt="" fill className="object-contain" />
        </div>

        {/* location */}
        <div className="absolute top-65 right-10 flex items-center gap-1">
          <LocationIcon size="xs" color="text-white" />
          <span className="text-[10px] font-light">{location}</span>
        </div>
      </div>
    </div>
  );
}
