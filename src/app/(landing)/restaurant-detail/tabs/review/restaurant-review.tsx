"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button, Rating } from "@/src/shared/ui";
import { RestaurantReviewProps } from "./restaurant-review-type";
import ReviewCard from "./review-card/review-card";

const { starIcon: StarIcon, messageIcon: MessageIcon } = ICONS;

export default function RestaurantReview({
  rating,
  reviewsCount,
  reviews,
}: RestaurantReviewProps) {
  return (
    <div className="mt-5">
      <div className="flex gap-10 rounded-sm border border-primary p-3 shadow-sm">
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
          <div className="mt-3">
            <Rating value={rating} size="sm" />
          </div>

          {/* reviewsCount */}
          <p className="font-regular mt-3 text-[13px] whitespace-nowrap text-primary">
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
            width="auto"
            rightIcon={<MessageIcon size="md" color="text-beige" />}
          >
            <span className="font-regular text-[13px]">ثبت دیدگاه</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
}
