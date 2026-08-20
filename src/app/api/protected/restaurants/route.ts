import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ slug: z.string().trim().min(2).max(180), name: z.string().trim().min(2).max(180), short_description: z.string().nullable().optional(), description: z.string().nullable().optional(), cover_image: z.string().nullable().optional(), phone_primary: z.string().max(30).nullable().optional(), phone_secondary: z.string().max(30).nullable().optional(), address: z.string().nullable().optional(), city: z.string().max(100).nullable().optional(), province: z.string().max(100).nullable().optional(), latitude: z.number().min(-90).max(90).nullable().optional(), longitude: z.number().min(-180).max(180).nullable().optional(), instagram: z.string().nullable().optional(), website: z.string().nullable().optional(), contact_description: z.string().nullable().optional(), is_featured: z.boolean().optional(), is_active: z.boolean().optional(), categoryIds: z.array(z.number().int().positive()).default([]), amenityIds: z.array(z.number().int().positive()).default([]) });

export const GET = withAuth(async (request) => {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page") ?? 1)); const limit = Math.min(50, Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? 20)));
  const where = { deleted_at: null }; const [total, data] = await Promise.all([prisma.restaurants.count({ where }), prisma.restaurants.findMany({ where, skip: (page - 1) * limit, take: limit, orderBy: { id: "desc" }, include: { categories: { include: { category: true } }, amenities: { include: { amenity: true } } } })]);
  return NextResponse.json({ data, meta: { total, page, limit, hasMore: page * limit < total } });
}, [2]);

export const POST = withAuth(async (request) => {
  const { categoryIds, amenityIds, ...data } = schema.parse(await request.json());
  const restaurant = await prisma.restaurants.create({ data: { ...data, categories: { create: categoryIds.map((category_id) => ({ category_id })) }, amenities: { create: amenityIds.map((amenity_id) => ({ amenity_id })) } } });
  return NextResponse.json(restaurant, { status: 201 });
}, [2]);
