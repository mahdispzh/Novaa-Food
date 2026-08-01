import { cn } from "@/src/shared/lib/utils";

import {
  RatingProps
} from "./rating-types";

import {
  ratingVariants
} from "./rating-variants";


export function Rating({
  value,
  max = 5,
  size,
}: RatingProps){

  return (
    <div
      className={cn(
        ratingVariants({
          size
        })
      )}
    >

      {
        Array.from({length:max}).map((_,index)=>(
          <span
            key={index}
            className={
              index < value
              ? "text-primary"
              : "text-gray-50"
            }
          >
            ★
          </span>
        ))
      }

    </div>
  );
}