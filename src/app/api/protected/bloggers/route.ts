import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
const schema = z.object({ user_id: z.number().int().positive().nullable().optional(), username: z.string().trim().min(2).max(80), display_name: z.string().trim().min(2).max(180), title: z.string().max(180).nullable().optional(), bio: z.string().nullable().optional(), cover_image: z.string().nullable().optional(), visitors_count: z.number().int().nonnegative().optional(), is_verified: z.boolean().optional(), is_active: z.boolean().optional() });
export const GET = withAuth(async () => NextResponse.json({ data: await prisma.blogger_profiles.findMany({ where: { deleted_at: null }, orderBy: { id: "desc" }, include: { _count: { select: { followers: true, recommendations: true, videos: true } } } }) }), [2]);
export const POST = withAuth(async (request) => NextResponse.json(await prisma.blogger_profiles.create({ data: schema.parse(await request.json()) }), { status: 201 }), [2]);
