"use client"

import Image from "next/image";
import categoryCardShape from "@/src/shared/ui/assets/shapes/category-card.svg";
import { CategoryCardProps } from "./category-card-types";
import { ICONS } from "@/src/shared/constants/dynamic-icon";



export default function CategoryCard({
  title,
  icon
}: CategoryCardProps) {

  const Icon = ICONS[icon as keyof typeof ICONS];
  return (
    <div className="relative w-[120px] h-[140px]">

      {/* Shape */}
      <Image
        src={categoryCardShape}
        alt=""
        fill
        className="object-contain"
      />


      {/* Icon */}
      <div className="absolute top-10 right-4">
        <Icon 
          size="2xl"
          color="text-beige"
        />
      </div>


      {/* Title */}
      <p className="absolute top-22 w-full font-regular text-[13px] text-center">
        {title}
      </p>

    </div>
  );
}