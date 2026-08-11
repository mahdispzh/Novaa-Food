import { cn } from "@/src/shared/lib/utils";

import { RatingProps } from "./rating-types";
import { ratingVariants } from "./rating-variants";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

const {
  starIcon: StarIcon,
  halfstarIcon: HalfStarIcon,
} = ICONS;

export function Rating({
  value,
  max = 5,
  size,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  return (
    <div
      className={cn(
        ratingVariants({
          size,
        })
      )}
    >
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarIcon
        size="xs"
          key={`star-${index}`}
          className="text-primary"
        />
      ))}

      {hasHalfStar && (
        <HalfStarIcon className="text-primary" size="xs" />
      )}
    </div>
  );
}