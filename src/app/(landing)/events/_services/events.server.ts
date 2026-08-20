"use server";

import { prisma } from "@/prisma/prisma";
import { getCurrentUserId } from "@/src/shared/components/auth/get-current-user-id";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const eventListSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(50).default(12),
  upcomingOnly: z.boolean().default(true),
  featured: z.boolean().optional(),
});

export async function getEvents(input: z.input<typeof eventListSchema> = {}) {
  const { page, limit, upcomingOnly, featured } = eventListSchema.parse(input);
  const where = {
    deleted_at: null,
    status: 1,
    ...(upcomingOnly ? { ends_at: { gte: new Date() } } : {}),
    ...(featured === undefined ? {} : { is_featured: featured }),
  };
  const [total, events] = await Promise.all([
    prisma.events.count({ where }),
    prisma.events.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ is_featured: "desc" }, { starts_at: "asc" }],
      include: { restaurant: { select: { id: true, slug: true, name: true, cover_image: true } }, _count: { select: { attendees: true } } },
    }),
  ]);
  return {
    data: events.map((event) => ({
      ...event,
      latitude: event.latitude === null ? null : Number(event.latitude),
      longitude: event.longitude === null ? null : Number(event.longitude),
      attendees_count: event._count.attendees,
      _count: undefined,
    })),
    meta: { total, page, limit, hasMore: page * limit < total },
  };
}

export async function getEvent(slug: string) {
  const safeSlug = z.string().trim().min(1).max(180).parse(slug);
  const userId = await getCurrentUserId();
  const event = await prisma.events.findFirst({
    where: { slug: safeSlug, deleted_at: null, status: 1 },
    include: {
      restaurant: { select: { id: true, slug: true, name: true, cover_image: true, address: true } },
      attendees: userId ? { where: { user_id: userId, deleted_at: null }, select: { status: true } } : false,
      _count: { select: { attendees: { where: { deleted_at: null } } } },
    },
  });
  if (!event) return null;
  return {
    ...event,
    latitude: event.latitude === null ? null : Number(event.latitude),
    longitude: event.longitude === null ? null : Number(event.longitude),
    attendees_count: event._count.attendees,
    registration_status: event.attendees[0]?.status ?? null,
    attendees: undefined,
    _count: undefined,
  };
}

export async function registerForEvent(eventId: number) {
  const id = z.number().int().positive().parse(eventId);
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("UNAUTHORIZED");

  const event = await prisma.events.findFirst({ where: { id, deleted_at: null, status: 1, OR: [{ registration_deadline: null }, { registration_deadline: { gte: new Date() } }] }, select: { capacity: true, slug: true, _count: { select: { attendees: { where: { deleted_at: null } } } } } });
  if (!event) throw new Error("EVENT_REGISTRATION_CLOSED");
  if (event.capacity !== null && event._count.attendees >= event.capacity) throw new Error("EVENT_CAPACITY_REACHED");

  await prisma.event_attendees.upsert({
    where: { event_id_user_id: { event_id: id, user_id: userId } },
    create: { event_id: id, user_id: userId, status: 1 },
    update: { status: 1, deleted_at: null },
  });
  revalidatePath(`/events/${event.slug}`);
  return { registered: true };
}

export async function cancelEventRegistration(eventId: number) {
  const id = z.number().int().positive().parse(eventId);
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("UNAUTHORIZED");
  await prisma.event_attendees.updateMany({
    where: { event_id: id, user_id: userId, deleted_at: null },
    data: { status: 2, deleted_at: new Date() },
  });
  revalidatePath("/events");
  return { registered: false };
}
