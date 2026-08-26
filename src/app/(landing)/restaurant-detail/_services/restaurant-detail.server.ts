"use server";

import { prisma } from "@/prisma/prisma";
import { getCurrentUserId } from "@/src/shared/components/auth/get-current-user-id";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getRestaurantDetail(slug: string) {
  const safeSlug = z.string().trim().min(1).max(180).parse(slug);
  const userId = await getCurrentUserId();
  const row = await prisma.restaurants.findFirst({
    where: { slug: safeSlug, deleted_at: null, is_active: true },
    include: {
      categories: { include: { category: true } },
      amenities: { include: { amenity: true } },
      hours: { orderBy: { weekday: "asc" } },
      images: { where: { deleted_at: null }, orderBy: { sort_order: "asc" } },
      menu_items: {
        where: { deleted_at: null, is_available: true },
        orderBy: { sort_order: "asc" },
      },
      reviews: {
        where: { deleted_at: null, status: 1, parent_id: null },
        orderBy: { created_at: "desc" },
        include: {
          user: { select: { id: true, name: true, image_id: true } },
          replies: {
            where: { deleted_at: null, status: 1 },
            orderBy: { created_at: "asc" },
            include: { user: { select: { id: true, name: true, image_id: true } } },
          },
        },
      },
      recommendations: {
        where: { deleted_at: null, blogger: { deleted_at: null, is_active: true } },
        include: { blogger: { select: { id: true, username: true, display_name: true, cover_image: true } } },
      },
      saved_by: userId ? { where: { user_id: userId }, select: { id: true } } : false,
    },
  });
  if (!row) return null;

  return {
    ...row,
    latitude: row.latitude === null ? null : Number(row.latitude),
    longitude: row.longitude === null ? null : Number(row.longitude),
    average_rating: Number(row.average_rating),
    categories: row.categories.map(({ category }) => category),
    amenities: row.amenities.map(({ amenity }) => amenity),
    is_saved: row.saved_by.length > 0,
    saved_by: undefined,
  };
}

const reviewSchema = z.object({
  restaurantId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(3).max(3000),
  parentId: z.number().int().positive().nullable().optional(),
});

export async function submitRestaurantReview(input: z.input<typeof reviewSchema>) {
  const data = reviewSchema.parse(input);
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("UNAUTHORIZED");

  const restaurant = await prisma.restaurants.findFirst({
    where: { id: data.restaurantId, deleted_at: null, is_active: true },
    select: { slug: true },
  });
  if (!restaurant) throw new Error("RESTAURANT_NOT_FOUND");

  const review = await prisma.restaurant_reviews.create({
    data: {
      restaurant_id: data.restaurantId,
      user_id: userId,
      parent_id: data.parentId ?? null,
      rating: data.rating,
      comment: data.comment,
      status: 0,
    },
    select: { id: true, status: true, created_at: true },
  });
  revalidatePath(`/restaurant-detail/${restaurant.slug}`);
  return review;
}

export async function softDeleteRestaurantReview(reviewId: number) {
  const id = z.number().int().positive().parse(reviewId);
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("UNAUTHORIZED");
  const result = await prisma.restaurant_reviews.updateMany({
    where: { id, user_id: userId, deleted_at: null },
    data: { deleted_at: new Date() },
  });
  if (!result.count) throw new Error("REVIEW_NOT_FOUND");
  revalidatePath("/restaurant-detail");
  return { deleted: true };
}
