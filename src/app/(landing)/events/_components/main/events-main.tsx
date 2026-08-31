import { getEvents } from "@/src/app/(landing)/events/_services/events.server";
import { transformEvents } from "./events-transformer";
import { EventCard } from "../event-card/event-card";

export default async function EventsMain() {
  const { data } = await getEvents();
  const events = data.map(transformEvents);

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}