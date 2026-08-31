"use client";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import eventCardShape from "@/src/shared/ui/assets/shapes/event-card.svg";
import Image from "next/image";
import { EventCardProps } from "./event-card-types";

const {
  clockIcon: ClockIcon,
  locationIcon: LocationIcon,
  sparkleIcon: SparkleIcon,
  complexDesignIcon: ComplexDesignIcon,
  timeIcon: TimeIcon,
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
    <div className="relative h-[350px] w-[430px] mr-4">
      <Image src={eventCardShape} alt="" className="object-contain" />
      <div className="flex flex-col">
        <p className="font-semibold font-morabba absolute top-8 right-5  text-[28px] text-beige">
          {title}
        </p>
        <p className="absolute top-15 right-5 text-[16px] font-light whitespace-pre-line text-beige">
          {description}
        </p>

        {/* ComplexDesignIcon */}
        <div className="absolute bottom-73 right-74">
          <ComplexDesignIcon size="5xl" color="text-beige" />
        </div>

        <div className="flex gap-2">
          {/* location */}
          <div className="absolute top-33 right-5 flex flex-col items-center gap-2">
            <LocationIcon size="xl" color="text-beige" />
            <p className="text-[12px] text-beige font-light whitespace-pre-line  w-20">
              {location}{" "}
            </p>
          </div>
          {/* divider */}
          <div className="absolute top-33 right-27 h-20 w-px bg-beige" />

          {/* date */}
          <div className="absolute top-33 right-38 flex flex-col items-center gap-0 leading-none">
            <p className="font-morabba text-beige text-[12px]">{weekday}</p>
            <p className="mt-2 font-morabba text-beige text-[32px] font-bold">{day}</p>
            <p className="font-ultralight text-beige mt-2 font-morabba text-[16px]">
              {month}
            </p>
          </div>

          {/* divider */}
          <div className="absolute top-33 right-58 h-20 w-px bg-beige" />

          <div className="absolute top-33 right-65 flex flex-col items-center">
            <ClockIcon size="xl" color="text-beige" />
            <p className="mt-4 text-beige text-[12px] font-light whitespace-pre-line">
              {timeRange}
            </p>
          </div>

          {/* timeRemaining */}
          <div className="flex gap-2 absolute top-62 right-5">
            <div className="flex flex-col ">
              <p className="font-morabba text-primary text-[12px] font-light">
                مانده تا شروع
              </p>
              <p className="font-morabba text-primary text-[22px] font-semibold">
                {remainingTime}
              </p>
            </div>
            </div>
            {/* timeRemaining icon */}
            <div className="absolute top-65 right-31">
              <TimeIcon size="4xl" color="text-primary" />
            </div>
             
            
           
          
        </div>
      </div>
    </div>
  );
}
