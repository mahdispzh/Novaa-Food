import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({ restaurant_id: z.number().int().positive().nullable().optional(), slug: z.string().trim().min(2).max(180), title: z.string().trim().min(2).max(200), description: z.string().nullable().optional(), cover_image: z.string().nullable().optional(), location_name: z.string().nullable().optional(), address: z.string().nullable().optional(), latitude: z.number().nullable().optional(), longitude: z.number().nullable().optional(), starts_at: z.coerce.date(), ends_at: z.coerce.date(), registration_deadline: z.coerce.date().nullable().optional(), capacity: z.number().int().positive().nullable().optional(), status: z.number().int().optional(), is_featured: z.boolean().optional() }).refine((x) => x.ends_at > x.starts_at, { message: "ends_at must be after starts_at" });
export const GET = withAuth(async () => NextResponse.json({ data: await prisma.events.findMany({ where: { deleted_at: null }, orderBy: { starts_at: "desc" }, include: { restaurant: true, _count: { select: { attendees: true } } } }) }), [2]);
export const POST = withAuth(async (request) => NextResponse.json(await prisma.events.create({ data: schema.parse(await request.json()) }), { status: 201 }), [2]);
