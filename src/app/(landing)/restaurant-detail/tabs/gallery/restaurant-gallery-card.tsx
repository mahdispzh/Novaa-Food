"use client";
import galleryCardShape from "@/src/shared/ui/assets/shapes/restaurant-gallery-card.svg";
import galleryCardSmallShape from "@/src/shared/ui/assets/shapes/restaurant-gallery-card2.svg";
import Image from "next/image";
import { GalleryCardProps } from "./restaurant-gallery-card-type";

export default function GalleryCard({ image, discription }: GalleryCardProps) {
  return (
    <div className="relative mt-7 h-[400px] w-full">
      <Image src={galleryCardShape} alt="" className="object-contain" />

      <div className="absolute -bottom-22">
        <Image src={galleryCardSmallShape} alt="" className="object-contain" />
      </div>
      <div className="absolute -bottom-18 right-5">
        <p className="text-[16px] font-normal text-primary font-morabba whitespace-pre-line text-center">
  {discription}
</p>
      </div>
    </div>
  );
}


