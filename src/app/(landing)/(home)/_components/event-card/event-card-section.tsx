"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import EventCard from "./event-card";
import Link from "next/link";

type EventSectionProps = {
  data: any[];
};

const { sparkleIcon: SparkleIcon,
  chevronlefticon:ChevronLeftIcon
 } = ICONS;

export default function EventCardSection({data}:EventSectionProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">

        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="رویدادها و لحظه‌ها"
            subtitle="بیشتر از یک وعده, یک تجربه"
          />
          <Link href="/events" className="flex items-center">
            <Button variant="link" size="sm">
              <span>مشاهده همه</span>
            </Button>
            <ChevronLeftIcon size="sm" color="text-secondary" />
          </Link>
        </div>


      <div
        className="scrollbar-hide flex overflow-x-auto scroll-smooth px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {data.map((event) => (
          <div
            key={event.id}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <EventCard
              title={event.title}
              description={event.description}
              weekday={event.weekday}
              day={event.day}
              month={event.month}
              timeRange={event.timeRange}
              location={event.location}
              remainingTime={event.remainingTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}