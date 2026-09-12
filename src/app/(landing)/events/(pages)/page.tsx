import Main from "@/src/shared/ui/main/main";
import EventsMain from "../_components/main/events-main";
import { WeeklyEvent } from "../_components/weekly-event/weekly-event";

export default async function EventsPage() {
  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-5xl flex-col gap-6">
          <div className="flex flex-col gap-4">
            <WeeklyEvent />
            <EventsMain />
          </div>
        </div>
      </div>
    </Main>
  );
}
