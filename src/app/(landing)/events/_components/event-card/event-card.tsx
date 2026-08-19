"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { Bookmark, CalendarDays, MapPin } from "lucide-react";

import { useSaveEvent } from "../../_hooks/use-save-event";
import type { EventCardProps } from "./event-card.types";

// Traces the same top-left "notch" the photo is carved into so the
// bookmark button reads as a cutout of the card's own cream background,
// with the card's outer top-right corner rounded to match.
// Coordinates are objectBoundingBox fractions (0–1), derived from the
// original 358×191.3 design so the shape scales with the card's width.
const NOTCH_PATH =
  "M 0.069701 0 H 0.929341 C 0.947827 0 0.965556 0.013742 0.978628 0.038203 " +
  "C 0.991698 0.062665 0.999042 0.095841 0.999042 0.130435 V 1 H 0 V 0.478261 " +
  "C 0 0.443667 0.007343 0.410491 0.020415 0.386030 " +
  "C 0.033486 0.361568 0.051215 0.347826 0.069701 0.347826 H 0.116168 " +
  "C 0.134653 0.347826 0.152382 0.334084 0.165453 0.309622 " +
  "C 0.178525 0.285161 0.185868 0.251985 0.185868 0.217391 V 0.130435 " +
  "C 0.185868 0.095841 0.193212 0.062665 0.206283 0.038203 " +
  "C 0.219354 0.013742 0.237083 0 0.255569 0 Z";

export function EventCard({ event }: EventCardProps) {
  const { isSaved, toggleSave } = useSaveEvent(event.isSaved);
  const clipId = `event-photo-notch-${useId()}`;

  return (
    <Link
      className="relative block w-full overflow-hidden rounded-[26px] border border-light-beige bg-light-beige"
      href={`/events/${event.slug}`}
    >
      {/* Hidden SVG def: the clip-path shape itself renders nothing. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <clipPath clipPathUnits="objectBoundingBox" id={clipId}>
            <path d={NOTCH_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* Photo bleeds edge to edge; clipped into the top-left notch and
          rounded top-right corner instead of a plain rectangle. */}
      <div
        className="relative h-[190px] w-full overflow-hidden"
        style={{ clipPath: `url(#${clipId})` }}
      >
        <Image
          fill
          priority
          alt={event.title}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 358px"
          src={event.image}
        />
      </div>
      <button
        aria-label={isSaved ? "حذف از نشان‌شده‌ها" : "ذخیره رویداد"}
          className={`absolute left-1 top-1 flex h-14 w-14 items-center justify-center rounded-2xl border-1 transition-colors ${
          isSaved
            ? "bg-secondary border-secondary"
            : "bg-light-beige border-secondary"
          }`}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleSave();
        }}>
        <Bookmark
          className={isSaved ? "text-light-beige" : "text-secondary"}
          fill={isSaved ? "currentColor" : "none"}
          size={20}
          strokeWidth={1}
        />
      </button>

      <div className="relative px-[18px] pb-[18px] pt-[30px]">
        <div className="absolute -top-[38px] left-[18px] flex h-[66px] w-[66px] flex-col items-center justify-center rounded-[14px] bg-[#8E977D] text-white shadow-[0_2px_6px_rgba(60,45,30,0.12)]">
          <span className="text-[16px] font-bold leading-none">
            {event.day}
          </span>
          <span className="mt-1 text-[10px] leading-none">{event.month}</span>
        </div>

        <div className="flex flex-col gap-2 pr-[84px] text-right" dir="rtl">
          <h3 className="text-[17px] font-bold text-[#362419]">
            {event.title}
          </h3>
          <p className="text-[13px] text-[#8A8A8A]">{event.description}</p>
        </div>

        <div
          className="mt-3 flex flex-col gap-2 text-[12.5px] text-[#9A9A9A]"
          dir="rtl"
        >
          <div className="flex items-center justify-end gap-2">
            <span>{event.timeRange}</span>
            <CalendarDays size={15} />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span>{event.location}</span>
            <MapPin size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}
