"use server";

import { prisma } from "@/prisma/prisma";
import { getCurrentUserId } from "@/src/shared/components/auth/get-current-user-id";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const listSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(50).default(12),
  search: z.string().trim().max(100).optional(),
  categorySlug: z.string().trim().max(140).optional(),
  city: z.string().trim().max(100).optional(),
  featured: z.boolean().optional(),
});

export async function getRestaurants(input: z.input<typeof listSchema> = {}) {
  const { page, limit, search, categorySlug, city, featured } =
    listSchema.parse(input);
  const where = {
    deleted_at: null,
    is_active: true,
    ...(city ? { city: { equals: city, mode: "insensitive" as const } } : {}),
    ...(featured === undefined ? {} : { is_featured: featured }),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(categorySlug
      ? {
          categories: {
            some: {
              category: { slug: categorySlug, deleted_at: null, is_active: true },
            },
          },
        }
      : {}),
  };

  const [total, rows] = await Promise.all([
    prisma.restaurants.count({ where }),
    prisma.restaurants.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ is_featured: "desc" }, { average_rating: "desc" }, { id: "desc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        short_description: true,
        cover_image: true,
        city: true,
        address: true,
        latitude: true,
        longitude: true,
        average_rating: true,
        reviews_count: true,
        is_featured: true,
        categories: { select: { category: { select: { id: true, name: true, slug: true, icon: true } } } },
      },
    }),
  ]);

  return {
    data: rows.map((row) => ({
      ...row,
      latitude: row.latitude === null ? null : Number(row.latitude),
      longitude: row.longitude === null ? null : Number(row.longitude),
      average_rating: Number(row.average_rating),
      categories: row.categories.map(({ category }) => category),
    })),
    meta: { total, page, limit, hasMore: page * limit < total },
  };
}

export async function getRestaurantCategories() {
  return prisma.restaurant_categories.findMany({
    where: { deleted_at: null, is_active: true },
    orderBy: [{ sort_order: "asc" }, { name: "asc" }],
    select: { id: true, parent_id: true, name: true, slug: true, icon: true, description: true },
  });
}

export async function toggleSavedRestaurant(restaurantId: number) {
  const id = z.number().int().positive().parse(restaurantId);
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("UNAUTHORIZED");

  const restaurant = await prisma.restaurants.findFirst({
    where: { id, deleted_at: null, is_active: true },
    select: { id: true },
  });
  if (!restaurant) throw new Error("RESTAURANT_NOT_FOUND");

  const key = { restaurant_id_user_id: { restaurant_id: id, user_id: userId } };
  const existing = await prisma.saved_restaurants.findUnique({ where: key });
  if (existing) await prisma.saved_restaurants.delete({ where: key });
  else await prisma.saved_restaurants.create({ data: { restaurant_id: id, user_id: userId } });

  revalidatePath("/restaurant-detail");
  revalidatePath("/resturants");
  return { saved: !existing };
}
