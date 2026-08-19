"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

import eventCardFrame from "../../_assets/frames/event-card-frame.svg";
import { useSaveEvent } from "../../_hooks/use-save-event";
import type { EventCardProps } from "./event-card.types";

// Every position below is taken directly from Group_3520.svg's own
// viewBox (358 x 328) — the frame artwork is never touched, these are
// just the percentages needed to line dynamic content up on top of it.
//
//   bookmark icon  : x 0      y 0       w 56.06  h 56.06
//   date badge     : x 19.96  y 159.36  w 58.22  h 58.22
//   white text area: x 0.42   y 161.47  w 357.17 h 165.17
const FRAME_W = 358;
const FRAME_H = 328;

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

export function EventCard({ event }: EventCardProps) {
  const { isSaved, toggleSave } = useSaveEvent(event.isSaved);

  return (
    <Link
      className="relative block aspect-358/328 w-full"
      href={`/events/${event.slug}`}
    >
      {/* The frame — untouched, drives the entire card's visual */}
      <Image
        fill
        priority
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none object-contain"
        src={eventCardFrame}
      />

      {/* Bookmark toggle, sitting exactly over the frame's icon */}
      <button
        aria-label={isSaved ? "حذف از نشان‌شده‌ها" : "ذخیره رویداد"}
        className="absolute"
        style={{
          left: pct(0, FRAME_W),
          top: pct(0, FRAME_H),
          width: pct(56.0597, FRAME_W),
          height: pct(56.0597, FRAME_H),
        }}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleSave();
        }}
      >
        {isSaved && (
          <span className="absolute left-[38%] top-[38%] h-[24%] w-[24%] rounded-full bg-primary" />
        )}
      </button>

      {/* Day / month, over the frame's green date badge */}
      <div
        className="absolute flex flex-col items-center justify-center text-white"
        style={{
          left: pct(19.9619, FRAME_W),
          top: pct(159.362, FRAME_H),
          width: pct(58.2233, FRAME_W),
          height: pct(58.2233, FRAME_H),
        }}
      >
        <span className="text-[15px] font-bold leading-none">
          {event.day}
        </span>
        <span className="mt-1 text-[10px] leading-none">{event.month}</span>
      </div>

      {/* Title / description / time / location, over the white area */}
      <div
        className="absolute flex flex-col justify-center gap-2 px-[7%] text-right"
        dir="rtl"
        style={{
          left: pct(0.41588, FRAME_W),
          top: pct(161.474, FRAME_H),
          width: pct(357.168, FRAME_W),
          height: pct(165.168, FRAME_H),
        }}
      >
        <h3 className="text-[16px] font-bold text-primary">{event.title}</h3>
        <p className="text-[13px] text-gray">{event.description}</p>

        <div className="mt-1 flex flex-col gap-1.5 text-[12px] text-gray">
          <div className="flex items-center justify-end gap-1.5">
            <span>{event.timeRange}</span>
            <Clock size={14} />
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <span>{event.location}</span>
            <MapPin size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
