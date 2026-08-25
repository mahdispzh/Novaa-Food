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
    <div className="flex flex-col">
      <div className="flex">
        {/* image */}
        <Image
          src={image}
          alt=""
          className="object-contain py-3"
          width={180}
          height={180}
        />

        <div className="mx-2 flex flex-1 flex-col">
          {/* title & icons */}
          <div className="mt-6 flex items-center justify-between">
            <p className="font-regular text-[16px] text-secondary">{title}</p>
            <div className="flex gap-1">
              <ShareIcon size="sm" color="text-secondary" />
              <SaveIcon size="sm" color="text-secondary" />
            </div>
          </div>
          {/* rating & location */}
          <div className="mt-4 flex items-center justify-between">
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
              <div key={feature} className="mt-4 flex items-center gap-1">
                <CorrectIcon size="sm" color="text-gray" />
                <span className="font-regular text-[12px] text-gray">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-3 border-b border-beige"></div>
    </div>
  );
}
