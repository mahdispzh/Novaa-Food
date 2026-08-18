import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import Main from "@/src/shared/ui/main/main";
import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { EventCard } from "../_components/event-card/event-card";
import { getEvents } from "../_services/events.service";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-[1024px] flex-col gap-6">
          <div className="flex items-start justify-between gap-3">
            <SectionHeading
              title="رویداد‌های هفته"
              subtitle="تخفیف‌ها، افتتاحیه‌های جدید و تجربه‌های ویژه کافه و رستوران‌ها را از دست نده"
            />

            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-white">
              <ICONS.sparkleIcon color="text-primary" size="md" />
            </div>
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
