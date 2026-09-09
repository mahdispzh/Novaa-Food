import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Image from "next/image";

interface SavedPlaceCardProps {
  title: string;
  categoryLabel: string;
  city: string;
  district: string;
  rating: number;
  imageSrc: string;
}

export function SavedPlaceCard({
  title,
  categoryLabel,
  city,
  district,
  rating,
  imageSrc,
}: SavedPlaceCardProps) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-4">
      <div className="relative h-20 w-30 shrink-0 overflow-hidden rounded-lg">
        <Image fill alt={title} className="object-cover" src={imageSrc} />
      </div>

      <div className="flex flex-1 flex-col gap-1 text-right">
        <span className="text-sm font-bold">{title}</span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <ICONS.typeIcon color="text-gray-400" size="sm" />
          {categoryLabel}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <ICONS.locationIcon color="text-gray-400" size="sm" />
          {city}، {district}
        </span>
      </div>

      <span className="flex items-center gap-1 text-xs text-gray-600">
        {rating}
        <ICONS.starIcon color="text-yellow-500" size="sm" />
      </span>
    </div>
  );
}