"use client";

import squares from "@/src/shared/ui/blogger-card/2square.svg";
import Image from "next/image";
import { BloggerRaitingProp } from "./blogger-rating-type";

type BloggerRatingCardProps = {
  data: BloggerRaitingProp;
};

export default function BloggerRatingCard({ data }: BloggerRatingCardProps) {
  const { icon: Icon, title, rating } = data;

  return (
    <div className="relative mt-3 h-[164px] w-[136px]">
      <Image
        src={squares}
        alt=""
        width={150}
        height={150}
      />

      {/* icon */}
      <div className="absolute left-1/2 top-8 -translate-x-1/2">
        <Icon color="text-beige" size="2xl" />
      </div>

      {/* title */}
      <div className="absolute left-1/2 top-18 w-full -translate-x-1/2 text-center">
        <p className="text-[13px] font-light text-red-500">
          {title}
        </p>
      </div>

    </div>
  );
}