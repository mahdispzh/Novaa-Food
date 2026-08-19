import Image from "next/image";
import ICONS from "@/src/shared/assets/dynamic-icons";

import Main from "@/src/shared/ui/main/main";
import headingFrame from "../_assets/frames/heading-frame.svg";
import { EventCard } from "../_components/event-card/event-card";
import { getEvents } from "../_services/events.service";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <Main>
      <div className="min-h-screen bg-light-beige pt-6 sm:pt-8">
        <div className="mx-auto flex w-[95%] max-w-5xl flex-col gap-6">
          <div className="relative mx-auto aspect-[358/100] w-full max-w-[358px]" dir="rtl">
            <Image
              fill
              priority
              alt=""
              aria-hidden="true"
              className="object-contain"
              src={headingFrame}
            />
            <h1 className="absolute right-3 top-1 text-16 text-[#8e977d]">
              رویدادهای هفته
            </h1>
            <p className="absolute bottom-8 left-[8%] right-14 text-right text-[13px] leading-7 text-white">
              تخفیفات، افتتاحیه‌ها و تجربه‌های جدید و ویژه کافه و رستوران‌ها را از دست نده.
            </p>
            <ICONS.complex
              aria-hidden="true"
              className="absolute bottom-8 right-3 text-white"
              size={38}
            />
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
