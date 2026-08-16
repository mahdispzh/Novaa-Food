"use client";
import { SliderDots } from "@/src/shared/ui";
import galleryCardShape from "@/src/shared/ui/assets/shapes/restaurant-gallery-card.svg";
import galleryCardSmallShape from "@/src/shared/ui/assets/shapes/restaurant-gallery-card2.svg";
import Image from "next/image";
import { useState } from "react";
import { GalleryCardData } from "./restaurant-gallery-card-constant";
import { GalleryCardProps } from "./restaurant-gallery-card-type";

export default function GalleryCard({ image, discription }: GalleryCardProps) {


  return (
    <div className="relative mt-3 h-[490px] w-full ">
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(${galleryCardShape.src})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: `url(${galleryCardShape.src})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
        }}
      >
        <Image src={image} alt="" fill className="object-cover" />
      </div>

      <div className="absolute right-4 bottom-[-3px]">
        <Image src={galleryCardSmallShape} alt="" className="object-contain" />
      </div>
      <div className="absolute right-10 bottom-12">
        <p className="text-center font-morabba text-[16px] font-normal whitespace-pre-line text-primary">
          {discription}
        </p>
      </div>

    </div>
  );
}
