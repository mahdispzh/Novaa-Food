import Main from "@/src/shared/ui/main/main";
import { EventCard } from "../_components/event-card/event-card";
import { getEvents } from "../_services/events.server";
import { WeeklyEvent } from "../_components/weekly-event/weekly-event";

type EventRecord = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  starts_at: Date;
  restaurant: { name: string } | null;
  registration_status: number | null;
};

export default async function EventsPage() {
  const { data } = await getEvents();
  const events = data as EventRecord[];

  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-5xl flex-col gap-6">
          <div className="flex flex-col gap-4">
            <WeeklyEvent/>
            {events.map((event) => (
              <EventCard key={event.id} event={{
                ...event,
                id: String(event.id),
                description: event.description ?? "",
                image: event.image ?? "",
                day: new Intl.DateTimeFormat("fa-IR", { day: "2-digit" }).format(event.starts_at),
                month: new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(event.starts_at),
                timeRange: new Intl.DateTimeFormat("fa-IR", { dateStyle: "short", timeStyle: "short" }).format(event.starts_at),
                location: event.restaurant?.name ?? "",
                isSaved: event.registration_status === 1,
              }} />
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
}
