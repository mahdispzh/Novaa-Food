"use client";
import Image from "next/image";
import popularCardShape from "../assets/svg/popular-card.svg";
import Badge from "../Badge/Badge";
import { popularCardProps } from "./popular-card-types";

export default function PopularCard({
  title,
  location,
  image,
  rating,
  category,
}: popularCardProps) {
  return (
    <div className="relative h-[280px] w-[260px]">
      {/* shape */}
      <Image src={popularCardShape} alt="" fill className="object-contain" />

      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col gap-2">
            {/* title */}
            <h5>{title}</h5>

            {/* rating */}
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
        </div>
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-3xl object-cover"
        />
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
