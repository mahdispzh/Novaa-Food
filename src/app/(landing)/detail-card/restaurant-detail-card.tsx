"use client";

import Image from "next/image";
import { RestaurantDetailCardProps } from "./restaurant-detail-card-type";

export default function RestaurantDetailCard({
  image,
  title,
}: RestaurantDetailCardProps) {
  return (
    <div className="relative w-[230px] shrink-0">

      {/* کارت اصلی */}
      <div className="relative z-10 rounded-sm border border-primary p-2">
        <div className="relative mt-2 h-40 w-full overflow-hidden rounded-sm">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <p className="mt-3 text-center text-sm text-primary font-medium text-foreground">
          {title}
        </p>
      </div>
    </div>
  );
}