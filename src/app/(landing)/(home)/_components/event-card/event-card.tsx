"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import eventCardShape from "@/src/shared/ui/assets/svg/event-card.svg";
import Image from "next/image";
import { EventCardProps } from "./event-card-types";

const {
  clockIcon: ClockIcon,
  locationIcon: LocationIcon,
  sparkleIcon: SparkleIcon,
} = ICONS;

export default function EventCards({
  title,
  description,
  weekday,
  day,
  month,
  timeRange,
  location,
  remainingTime,
}: EventCardProps) {
  return (
    <div className="relative h-[350px] w-[330px] bg-blue-200">
      <Image src={eventCardShape} alt="" fill className="object-contain" />
      <div className="flex flex-col">
        <p className="font-semiBold font-Morabba absolute top-13 right-5 text-[28px] text-beige">
          {title}
        </p>
        <p className="absolute top-25 right-5 text-[16px] font-light whitespace-pre-line text-beige">
          {description}
        </p>
        <div className="flex gap-2">
          <div className="absolute top-40 right-5 flex flex-col gap-2 text-center">
            <LocationIcon size="xl" color="text-white" />
            <p className="text-[12px] font-light whitespace-pre-line">
              {location}{" "}
            </p>
          </div>
          <div className="h-10 w-px bg-white/20" />
          <div className="absolute top-40 right-30 flex flex-col items-center">
            <p>{weekday}</p>
            <p>{day}</p>
            <p className="font-Morabba font-ultralight text-[16px]">{month}</p>
          </div>

          <div className="absolute top-40 right-55 flex flex-col">
            <ClockIcon size="xl" color="text-white" />
            <p className="whitespace-pre-line text-[12px] font-light">{timeRange}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
