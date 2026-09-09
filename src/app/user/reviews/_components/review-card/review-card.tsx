// ReviewCard.tsx
import React from "react";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import type { Review, ReviewCardProps } from "@/src/app/user/reviews/_types/reviews.types";


const STATUS_LABEL: Record<Review["status"], string> = {
  published: "منتشر شده",
  pending: "در انتظار بررسی",
};

function StarRating({
  rating,
  maxRating = 5,
}: {
  rating: number;
  maxRating?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.round(rating);
        return (
          <ICONS.starIcon
            key={i}
            size={14}
            className={filled ? "fill-primary text-primary" : "text-gray-300"}
          />
        );
      })}
    </div>
  );
}

export default function ReviewCard({ review, onClick, className = "" }: ReviewCardProps) {
  const { businessName, rating, maxRating, status, date, text, response } = review;

  return (
    <div
      dir="rtl"
      lang="fa"
      onClick={() => onClick?.(review)}
      className={[
        "w-full border-b border-gray-200 px-3 py-5",
        "font-[system-ui,-apple-system,'Segoe_UI',Tahoma,sans-serif]",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      {/* Header row: title on the right, rating on the left (RTL) */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold leading-6 text-gray-900">
          {businessName}
        </h3>
        <ICONS.starIcon rating={rating} maxRating={maxRating} />
      </div>

      {/* Status badge + date */}
      <div className="mt-2 flex items-center gap-2">
        <span className="rounded-full bg-light-beige px-2.5 py-0.5 text-xs font-medium text-primary">
          {STATUS_LABEL[status]}
        </span>
        <span className="relative left-1 text-xs text-gray-400">{date}</span>
      </div>

      {/* Review body */}
      <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>

      {/* Owner response */}
      {response && (
        <div className="mt-4 rounded-xl bg-primary p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <ICONS.userIcon size="sm" className="text-secondary" />
            </span>
            <span className="text-sm font-medium text-secondary">
              {response.authorLabel}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-secondary">{response.text}</p>
        </div>
      )}
    </div>
  );
}