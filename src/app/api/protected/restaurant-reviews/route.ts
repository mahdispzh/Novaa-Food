import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = withAuth(async (request, user) => {
  const restaurantId = Number(request.nextUrl.searchParams.get("restaurantId"));
  const rows = await prisma.restaurant_reviews.findMany({ where: { user_id: user.userId, deleted_at: null, ...(restaurantId ? { restaurant_id: restaurantId } : {}) }, orderBy: { created_at: "desc" }, include: { restaurant: { select: { id: true, slug: true, name: true } } } });
  return NextResponse.json({ data: rows });
}, [1, 2]);

export const POST = withAuth(async (request, user) => {
  const data = z.object({ restaurantId: z.number().int().positive(), rating: z.number().int().min(1).max(5), comment: z.string().trim().min(3).max(3000), parentId: z.number().int().positive().nullable().optional() }).parse(await request.json());
  const review = await prisma.restaurant_reviews.create({ data: { restaurant_id: data.restaurantId, user_id: user.userId, rating: data.rating, comment: data.comment, parent_id: data.parentId ?? null, status: 0 } });
  return NextResponse.json(review, { status: 201 });
}, [1, 2]);
