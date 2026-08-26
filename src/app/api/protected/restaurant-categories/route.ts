import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ name: z.string().trim().min(2).max(120), slug: z.string().trim().min(2).max(140), parent_id: z.number().int().positive().nullable().optional(), icon: z.string().max(100).nullable().optional(), description: z.string().nullable().optional(), sort_order: z.number().int().optional(), is_active: z.boolean().optional() });
export const GET = withAuth(async () => NextResponse.json({ data: await prisma.restaurant_categories.findMany({ where: { deleted_at: null }, orderBy: [{ sort_order: "asc" }, { id: "asc" }] }) }), [2]);
export const POST = withAuth(async (request) => NextResponse.json(await prisma.restaurant_categories.create({ data: schema.parse(await request.json()) }), { status: 201 }), [2]);
