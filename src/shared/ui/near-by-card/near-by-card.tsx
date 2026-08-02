"use client";
import Image from "next/image";
import nearByCardShape from "../assets/svg/near-by-card.svg";
import Badge from "../Badge/Badge";
import { nearByCardProps } from "./near-by-card-types";

export default function NearByCard({
  title,
  icon,
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
        <div className="absolute top-50 right-25 flex gap-10">
          {/* title */}
          <div className="top-52 right-25">
            <h5>{title}</h5>
          </div>

          {/* Rating */}
          <div className="top-60 right-25 z-10">
            <Badge variant="secondary" badgeSize="sm">
              {rating}
            </Badge>
          </div>

          <div className="absolute top-5 left-46 z-20 flex flex-col items-center justify-center gap-1 text-white">
            <span className="flex items-center justify-center">{icon}</span>
            <span className="text-xs">{category}</span>
          </div>
        </div>

        {/* location */}
        <p className="absolute top-60 right-25 text-sm font-light">
          {location}
        </p>
      </div>
    </div>
  );
}
