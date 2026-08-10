"use client";
import Image from "next/image";
import { GalleryCardProps } from "./restaurant-gallery-card-type";
import galleryCardShape from "@/src/shared/ui/assets/shapes/restaurant-gallery-card.svg"

export default function GalleryCard({
  image,
  discription,
}: GalleryCardProps) {
  return (
    <div className="relative h-[460px] w-[360px]">
      <Image src={galleryCardShape} alt="" fill className="object-contain" />
    </div>
  );
}
