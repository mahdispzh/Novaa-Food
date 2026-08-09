"use client";

import { Button } from "@/src/shared/ui";
import { RestaurantReviewProps } from "./restaurant-review-type";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

const {
  starIcon: StarIcon,
} = ICONS;

export default function RestaurantReview({
  rating,
  reviewsCount,
  reviews,
}: RestaurantReviewProps) {
  return (
    <div className="px-3">
    <div className="border border-primary rounded-sm p-3 shadow-sm">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p>
            <span className="text-[22px] font-semibold text-secondary">
              {rating}
            </span>
            <span className="font-regular mr-2 text-[13px] font-semibold text-primary">
              از 5
            </span>
          </p>
          <p className="font-regular text-[13px]">
            شماهم درباره این کالا دیدگاه خود را ثبت کنید.
          </p>
        </div>
        <div className="mt-1 flex gap-0.5 mt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} size="xs" color="text-secondary" />
          ))}
        </div>
        <div className="flex justify-between items-center">
            <p className="text-[13px] font-regular text-primary mt-3">از مجموع {reviewsCount} امتیاز</p>
            <Button variant="primary" size="md" rounded="sm" width="medium">

            </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
