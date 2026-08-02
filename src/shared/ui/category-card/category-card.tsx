"use client"

import Image from "next/image";
import CircleSvg from "../assets/svg/category-card.svg";

import { CategoryCardProps } from "./category-card-types";


export default function CategoryCard({
  title,
  icon,
}: CategoryCardProps) {

  return (
    <div className="relative w-[120px] h-[140px]">

      {/* Shape */}
      <Image
        src={CircleSvg}
        alt=""
        fill
        className="object-contain"
      />


      {/* Icon */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        {icon}
      </div>


      {/* Title */}
      <p className="absolute bottom-5 w-full text-center">
        {title}
      </p>

    </div>
  );
}