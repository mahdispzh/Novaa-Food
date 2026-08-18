"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Rating } from "@/src/shared/ui";
import { Review } from "../restaurant-review-type";

const { dislikeIcon: DislikeIcon, likeIcon: LikeIcon } = ICONS;

export default function ReviewCard({ name, date, rating, comment }: Review) {
  return (
    <div className="mt-5 rounded-sm border border-beige ">
      <div className="flex flex-col p-2">
        <div className="flex justify-between ">
          <p className="font-regular text-[13px] text-secondary">{name}</p>
          <p className="font-regular text-[13px] text-gray">{date}</p>
        </div>
        {/* stars */}
        <div className="mt-2">
          <Rating value={rating} size="sm" />
        </div>

        <p className="text-[13px] font-light text-gray mt-4">{comment}</p>
        <div className="flex gap-1 mt-4 items-end justify-end w-full">
          <DislikeIcon size="md" color="text-primary" />
          <div className="h-4 w-px bg-gray-300" />
          <LikeIcon size="md" color="text-primary" />
        </div>
      </div>
    </div>
  );
}
