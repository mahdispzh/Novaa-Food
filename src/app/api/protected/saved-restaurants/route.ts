import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export const GET = withAuth(async (_request, user) => {
  const rows = await prisma.saved_restaurants.findMany({ where: { user_id: user.userId, restaurant: { deleted_at: null, is_active: true } }, orderBy: { created_at: "desc" }, include: { restaurant: { include: { categories: { include: { category: true } } } } } });
  return NextResponse.json({ data: rows });
}, [1, 2]);

export const POST = withAuth(async (request, user) => {
  const { restaurantId } = z.object({ restaurantId: z.number().int().positive() }).parse(await request.json());
  const key = { restaurant_id_user_id: { restaurant_id: restaurantId, user_id: user.userId } };
  const existing = await prisma.saved_restaurants.findUnique({ where: key });
  if (existing) await prisma.saved_restaurants.delete({ where: key });
  else await prisma.saved_restaurants.create({ data: { restaurant_id: restaurantId, user_id: user.userId } });
  return NextResponse.json({ saved: !existing });
}, [1, 2]);
