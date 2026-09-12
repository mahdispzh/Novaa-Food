// ReviewCard.tsx
import type {
  Review,
  ReviewCardProps,
} from "@/src/app/user/reviews/_types/reviews.types";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

const STATUS_LABEL: Record<Review["status"], string> = {
  published: "بررسی شد",
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
            className={filled ? "fill-primary text-primary" : "text-gray-300"}
            size="3xl"
          />
        );
      })}
    </div>
  );
}

export default function ReviewCard({
  review,
  onClick,
  className = "",
}: ReviewCardProps) {
  const { businessName, rating, maxRating, status, date, text, response } =
    review;

  return (
    <div
      className={[
        "w-full border-b border-gray-200 px-3 py-5",
        "font-[system-ui,-apple-system,'Segoe_UI',Tahoma,sans-serif]",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
      dir="rtl"
      lang="fa"
      onClick={() => onClick?.(review)}
    >
      {/* Header row: title and status on the right, rating on the left (RTL) */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] leading-6 font-semibold text-gray-900">
            {businessName}
          </h3>
          <span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium"
            style={
              status === "published"
                ? { backgroundColor: "#E8EEE2", color: "#6F7F58" }
                : { backgroundColor: "#FFF3CD", color: "#B8860B" }
            }
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  status === "published" ? "#8E977D" : "#B8860B",
              }}
            />
            {STATUS_LABEL[status]}
          </span>
        </div>
        <div className="flex items-center gap-1" dir="rtl">
          <span className="text-sm font-medium text-secondary">
            {rating.toLocaleString("fa-IR")}
          </span>
          <ICONS.starIcon className="text-primary" />
        </div>
      </div>

      {/* Date */}
      <div className="mt-2 flex items-center">
        <span className="relative left-1 text-xs text-gray-400">{date}</span>
      </div>

      {/* Review body */}
      <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>

      {/* Owner response */}
      {response && (
        <div className="mt-4 rounded-xl bg-primary p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <ICONS.userIcon className="text-secondary" size="sm" />
            </span>
            <span className="text-sm font-medium text-secondary">
              {response.authorLabel}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-secondary">
            {response.text}
          </p>
        </div>
      )}
    </div>
  );
}
