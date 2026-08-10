"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { RestaurantReviewProps } from "./restaurant-review-type";
import { Button } from "@/src/shared/ui";
import ReviewCard from "./review-card/review-card";

const { starIcon: StarIcon, messageIcon: MessageIcon } = ICONS;

export default function RestaurantReview({
  rating,
  reviewsCount,
  reviews,
}: RestaurantReviewProps) {
  return (
    <div className="px-3 py-3">
    <div className="p-3 flex gap-10 border border-primary rounded-sm shadow-sm">
      <div className="flex flex-col">
        {/* 4.5 از 5 */}
        <p>
          <span className="text-[22px] font-semibold text-secondary">
            {rating}
          </span>
          <span className="font-regular mr-2 text-[13px] font-semibold text-primary">
            از 5
          </span>
        </p>

        {/* stars */}
        <div className="mt-1 mt-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} size="xs" color="text-secondary" />
          ))}
        </div>

        {/* reviewsCount */}
        <p className="font-regular mt-3 text-[13px] text-primary whitespace-nowrap">
          از مجموع {reviewsCount} امتیاز
        </p>
      </div>

      {/* second col */}
      <div className="flex flex-col gap-5">
        {/* discription */}
        <p className="font-regular text-[13px]">
          شماهم درباره این کالا دیدگاه خود را ثبت کنید.
        </p>

        <Button
          variant="primary"
          size="md"
          rounded="sm"
          width="small"
          rightIcon={<MessageIcon size="md" color="text-beige" />}
        >
          <span className="font-regular text-[13px]">ثبت دیدگاه</span>
        </Button>
      </div>
    </div>
    <ReviewCard/>
    </div>
  );
}

