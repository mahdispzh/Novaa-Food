import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ eventId: string }> };

export const POST = withAuth(async (_request, user, context?: Params) => {
  const { eventId } = await context!.params; const id = Number(eventId); const now = new Date();
  const event = await prisma.events.findFirst({ where: { id, deleted_at: null, status: 1, ends_at: { gt: now }, OR: [{ registration_deadline: null }, { registration_deadline: { gte: now } }] }, select: { capacity: true, _count: { select: { attendees: { where: { deleted_at: null } } } } } });
  if (!event) return NextResponse.json({ message: "ثبت‌نام بسته است" }, { status: 409 });
  if (event.capacity !== null && event._count.attendees >= event.capacity) return NextResponse.json({ message: "ظرفیت تکمیل است" }, { status: 409 });
  await prisma.event_attendees.upsert({ where: { event_id_user_id: { event_id: id, user_id: user.userId } }, create: { event_id: id, user_id: user.userId, status: 1 }, update: { status: 1, deleted_at: null } });
  return NextResponse.json({ registered: true });
}, [1, 2]);

export const DELETE = withAuth(async (_request, user, context?: Params) => {
  const { eventId } = await context!.params;
  await prisma.event_attendees.updateMany({ where: { event_id: Number(eventId), user_id: user.userId, deleted_at: null }, data: { status: 2, deleted_at: new Date() } });
  return NextResponse.json({ registered: false });
}, [1, 2]);
