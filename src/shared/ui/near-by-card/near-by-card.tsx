"use client";
import Image from "next/image";
import nearByCardShape from "../assets/svg/near-by-card.svg";
import Badge from "../Badge/Badge";
import { nearByCardProps } from "./near-by-card-types";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

const { starIcon: StarIcon, locationIcon: LocationIcon, typeIcon: TypeIcon } = ICONS;

export default function NearByCard({
  title,
  location,
  rating,
  image,
  category,
}: nearByCardProps) {
  return (
    <div className="relative h-[280px] w-[260px]">
      {/* Shape */}
      <Image src={nearByCardShape} alt="" fill className="object-contain" />

      <div className="flex flex-col gap-3">
        {/* عکس کافه */}
        <div className="absolute top-4 right-4 left-4 h-[170px]">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="absolute top-52 right-25 flex gap-5">
          {/* title */}

            <h5>{title}</h5>

          {/* Rating */}

            <div className="flex gap-1">

            </div>
            <Badge
              variant="secondary"
              badgeSize="sm"
              leftIcon={<StarIcon size="xs" color="text-white" />}
            >
              {rating}
            </Badge>
          
         
        </div>

         {/* category */}
          <div className="absolute top-56 right-7.5 z-20 flex flex-col items-center justify-center gap-1 text-white">
            <TypeIcon size="xl" color="text-white" />
            <span className="text-xs">{category}</span>
          </div>

        {/* location */}
        <div className="flex gap-1 absolute items-center top-60 right-25">
            <LocationIcon size="sm" color="text-white" />
          <p className=" text-sm font-light">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
