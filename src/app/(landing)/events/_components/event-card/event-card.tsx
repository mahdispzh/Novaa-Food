"use client";

import Image from "next/image";
import Link from "next/link";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

import { useSaveEvent } from "../../_hooks/use-save-event";
import type { EventCardProps } from "./event-card.types";

export function EventCard({ event }: EventCardProps) {
  const { isSaved, toggleSave } = useSaveEvent(event.isSaved);

  return (
    <Link
      className="flex w-full flex-col gap-3 rounded-[28px] bg-white p-3 shadow-sm"
      href={`/events/${event.slug}`}
    >
      <div className="relative aspect-[1.7] w-full overflow-hidden rounded-[20px]">
        <Image
          fill
          alt={event.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
          src={event.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        <button
          aria-label={isSaved ? "حذف از نشان‌شده‌ها" : "ذخیره رویداد"}
          className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleSave();
          }}
        >
          <ICONS.saveIcon
            color={isSaved ? "text-primary" : "text-gray"}
            size="sm"
          />
        </button>

        <div className="absolute bottom-3 left-3 flex flex-col items-center justify-center rounded-2xl bg-primary px-3 py-1.5 leading-none text-white">
          <span className="text-[15px] font-bold">{event.day}</span>
          <span className="mt-0.5 text-[10px]">{event.month}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-1 pb-1 text-right">
        <h3 className="text-[16px] font-bold text-primary">{event.title}</h3>
        <p className="text-[13px] text-gray">{event.description}</p>

        <div className="mt-1 flex flex-col gap-1.5">
          <div className="flex items-center justify-end gap-1.5 text-[12px] text-gray">
            <span>{event.timeRange}</span>
            <ICONS.clockIcon color="text-gray" size="sm" />
          </div>
          <div className="flex items-center justify-end gap-1.5 text-[12px] text-gray">
            <span>{event.location}</span>
            <ICONS.locationIcon color="text-gray" size="sm" />
          </div>
        </div>
      </div>
    </Link>
  );
}
