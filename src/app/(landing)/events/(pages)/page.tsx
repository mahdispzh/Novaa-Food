import Main from "@/src/shared/ui/main/main";
import { EventCard } from "../_components/event-card/event-card";
import { getEvents } from "../_services/events.service";
import { WeeklyEvent } from "../_components/weekly-event/weekly-event";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-5xl flex-col gap-6">
          <div className="flex flex-col gap-4">
            <WeeklyEvent/>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
}
