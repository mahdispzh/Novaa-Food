"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Badge from "@/src/shared/ui/Badge/Badge";
import Image from "next/image";
import { exploreCardsProps } from "./explore-cards-types";

const {
  locationIcon: LocationIcon,
  starIcon: StarIcon,
  correctIcon: CorrectIcon,
  saveIcon: SaveIcon,
  shareIcon: ShareIcon,
} = ICONS;

export default function ExploreCards({
  title,
  rating,
  location,
  reviewsCount,
  features,
  image,
}: exploreCardsProps) {
  return (
    <div className="flex">
        {/* image */}
      <Image src={image} alt="" className="object-contain p-3" width={200} height={200}/>

      <div className="flex flex-col flex-1 mx-2">
        {/* title & icons */}
        <div className="flex items-center justify-between mt-6">
          <p className="font-regular text-[16px] text-secondary">{title}</p>
          <div className="flex gap-1">
            <ShareIcon size="sm" color="text-secondary" />
            <SaveIcon size="sm" color="text-secondary" />
          </div>
        </div>
        {/* rating & location */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <Badge variant="ghost" badgeSize="sm">
              {rating}
            </Badge>
            <StarIcon size="xs" color="text-primary" />
            <p className="text-[10px] font-light text-primary">
              ({reviewsCount} نظر)
            </p>
          </div>
          <div className="flex items-center gap-1">
            <LocationIcon size="sm" color="text-primary" />
            <p className="text-[12px] font-light text-primary">{location}</p>
          </div>
        </div>
        <div>
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-1 mt-4">
              <CorrectIcon size="sm" color="text-gray" />
              <span className="font-regular text-[12px] text-gray">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
