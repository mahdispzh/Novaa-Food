"use client";
import galleryCardShape from "@/src/shared/ui/assets/shapes/restaurant-gallery-card.svg";
import Image from "next/image";
import { GalleryCardProps } from "./restaurant-gallery-card-type";

export default function GalleryCard({ image, discription }: GalleryCardProps) {
  return (
    <div className="relative h-[460px] w-[360px] mt-7">
      <Image src={galleryCardShape} alt="" fill className="object-contain" />
<div
        className="absolute h-[460px] w-[360px]"
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
  <div className="absolute top-95 right-2 w-[189px] h-[80px] rounded-[28px] bg-beige px-4 py-3">
        <p className="text-[16px] font-normal text-primary font-morabba whitespace-pre-line text-center">
          {discription}
        </p>
      </div>
    </div>
  );
}
