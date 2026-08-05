"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import Container from "@/src/shared/ui/container/container";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import EventCard from "./event-card";
import { eventCards } from "./event-card-constant";

const { sparkleIcon: SparkleIcon } = ICONS;

export default function EventCardSection() {
  return (
    <Container>
      <div className="flex flex-col justify-between gap-3">
        <div className="flex items-center justify-between gap-2">
          <SectionHeading
            title="رویدادها و لحظه‌ها"
            subtitle="بیشتر از یک وعده, یک تجربه"
          />
          <div className="flex gap-1 items-center">
            <Button variant="link" size="sm">
              <span>مشاهده همه</span>
            </Button>
            <SparkleIcon size="md" color="text-primary" />
          </div>
        </div>

        <div className="flex gap-5">
          {eventCards.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              weekday={event.weekday}
              day={event.day}
              month={event.month}
              timeRange={event.timeRange}
              location={event.location}
              remainingTime={event.remainingTime}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
