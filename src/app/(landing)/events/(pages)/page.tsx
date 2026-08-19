import Main from "@/src/shared/ui/main/main";
import { EventCard } from "../_components/event-card/event-card";
import { getEvents } from "../_services/events.service";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-5xl flex-col gap-6">
          <div className="flex items-start justify-between gap-3">
          </div>

          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
}
