"use client"

import Image from "next/image";
import categoryCardShape from "@/src/shared/ui/assets/shapes/category-card.svg";
import type { CategoryCardProps } from "./category-card-types";
import { ICONS } from "@/src/shared/constants/dynamic-icon";



export default function CategoryCard({
  title,
  icon
}: CategoryCardProps) {

  const Icon = ICONS[icon as keyof typeof ICONS];
  return (
    <div className="relative flex-1 overflow-hidden h-[140px]">

      {/* Shape */}
      <Image
        fill
        alt=""
        className="object-contain"
        src={categoryCardShape}
      />


      {/* Icon */}
      <div className="absolute top-11 right-3">
        <Icon 
          color="text-beige"
          size="2xl"
        />
      </div>


      {/* Title */}
      <p className="absolute text-beige top-22 w-full font-regular text-[13px] text-center">
        {title}
      </p>

    </div>
  );
}