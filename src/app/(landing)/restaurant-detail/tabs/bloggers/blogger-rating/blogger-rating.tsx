"use client";

import { StarIcon } from "@/src/shared/constants/icons/star-icon";
import squares from "@/src/shared/ui/blogger-card/2square.svg";
import Image from "next/image";
import { BloggerRaitingProp } from "./blogger-rating-type";

type BloggerRatingCardProps = {
  data: BloggerRaitingProp;
};

export default function BloggerRatingCard({ data }: BloggerRatingCardProps) {
  const { icon: Icon, title, rating } = data;

  return (
    <div className="relative mt-5 h-[164px] flex-1 overflow-hidden">
      {/* Shape */}
      <Image fill alt="" className="object-contain" src={squares} />

      {/* Icon */}
      <div className="absolute top-[40px] right-[47px]">
        <Icon color="text-beige" size="4xl" />
      </div>

      {/* Title */}
      <p className="font-regular absolute top-[85px] right-[5px] w-full text-center text-[13px] text-beige">
        {title}
      </p>
      <div className="flex items-center gap-1 w-full absolute top-[108px] right-[52px]">
        
        <p className="text-[13px] text-beige font-medium">{rating}</p>
        <StarIcon size="xs" color="text-beige" />
      </div>
    </div>
  );
}
