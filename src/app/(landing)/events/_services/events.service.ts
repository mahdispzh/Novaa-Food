import { MOCK_EVENTS } from "../_constants/events.mock";
import type { Event } from "../_types/event.types";

// List page ----------------------------------------------------------------

export async function getEvents(): Promise<Event[]> {
  return MOCK_EVENTS;
}

// Detail page (if/when one gets built) — kept separate so it can later be
// swapped for a real API/DB call without touching the list page's code.

export async function getEvent(slug: string): Promise<Event | null> {
  return MOCK_EVENTS.find((event) => event.slug === slug) ?? null;
}
