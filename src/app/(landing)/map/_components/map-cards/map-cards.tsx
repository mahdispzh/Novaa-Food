import { ICONS } from "@/src/shared/constants/dynamic-icon";
import mapCardRectangleShape from "@/src/shared/ui/assets/shapes/map-card-rectangle.svg";
import mapCardsquerShape from "@/src/shared/ui/assets/shapes/map-card-squer.svg";
import mapCardShape from "@/src/shared/ui/assets/shapes/map-card.svg";
import Badge from "@/src/shared/ui/Badge/Badge";
import Image from "next/image";
import { mapCardProps } from "./map-cards-type";

const { starIcon: StarIcon, locationIcon: LocationIcon } = ICONS;

export default function MapCards({
  image,
  title,
  rating,
  location,
}: mapCardProps) {
  return (
    <div className="relative h-[300px] w-[280px] shrink-0">
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(${mapCardShape.src})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskImage: `url(${mapCardShape.src})`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
        }}
      >
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      {/* squerShape */}
      <div className="absolute right-[225px] bottom-[212px]">
        <Image
          src={mapCardsquerShape}
          alt=""
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
      {/* RectangleShape */}
      <div className="absolute top-43 left-40">
        <Image
          src={mapCardRectangleShape}
          alt=""
          className="h-[135px] w-[120px] object-contain"
        />
      </div>

      {/* rating */}
      <div className="absolute top-11 right-58 flex items-center gap-1">
        <StarIcon size="xs" color="text-secondary" />
        <Badge variant="secondaryText" badgeSize="lg">
          {rating}
        </Badge>
      </div>

      {/* title */}
      <div className="absolute top-54 right-2">
        <p className="font-morabba text-[16px] font-light text-secondary">
          {title}
        </p>
      </div>
      {/* location */}

      <div dir="rtl" className="absolute top-61 right-2 flex gap-1 items-center">
        <LocationIcon size="sm" color="text-secondary" />
        <p className="font-morabba text-[12px] font-light text-secondary">
          {location}
        </p>
      </div>
    </div>
  );
}
