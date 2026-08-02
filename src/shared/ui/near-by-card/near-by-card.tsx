import Image from "next/image";
import nearByCard from "../assets/svg/near-by-card.svg";
import { Rating } from "../rating/rating";
import { nearByCardProps } from "./near-by-card-types";

export default function NearByCard({
  title,
  icon,
  location,
  rating,
  image,
  category,
}: nearByCardProps) {
  return (
    <div className="z-index relative h-[280px] w-[260px]">
      {/* Shape */}
      <Image src={nearByCard} alt="" fill className="object-contain" />

      
      <div className="flex flex-col gap-3">

        {/* عکس کافه */}
        <div className="absolute top-4 right-4 left-4 h-[170px]">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="flex gap-3">

            {/* title */}
          <div className="absolute top-55 right-25">
            <h5>{title}</h5>
          </div>

          {/* Rating */}
          <div className="absolute">
            <Rating size="sm" value={rating} />
          </div>
        </div>

          {/* location */}
        <p className="absolute top-60 right-25 text-sm">{location}</p>
      </div>
    </div>
  );
}
