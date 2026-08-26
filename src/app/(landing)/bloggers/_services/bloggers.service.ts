"use server";

import { prisma } from "@/prisma/prisma";
import { getCurrentUserId } from "@/src/shared/components/auth/get-current-user-id";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Blogger, BloggerRecommendedPlace, BloggerSocialLinks, BloggerStats, BloggerVideo } from "../_types/blogger.types";

export interface BloggerProfile {
  id: string; name: string; username: string; title?: string; bio: string;
  coverImage: string; isFollowing: boolean;
}

async function followedIds() {
  const userId = await getCurrentUserId();
  if (!userId) return new Set<number>();
  const rows = await prisma.blogger_follows.findMany({ where: { user_id: userId }, select: { blogger_id: true } });
  return new Set(rows.map((row) => row.blogger_id));
}

export async function getBloggers(): Promise<Blogger[]> {
  const [rows, following] = await Promise.all([
    prisma.blogger_profiles.findMany({
      where: { deleted_at: null, is_active: true },
      orderBy: [{ is_verified: "desc" }, { id: "desc" }],
      include: {
        _count: { select: { followers: true, recommendations: true } },
        recommendations: { where: { deleted_at: null, restaurant: { deleted_at: null, is_active: true } }, orderBy: { sort_order: "asc" }, include: { restaurant: { include: { categories: { include: { category: true } } } } } },
        videos: { where: { deleted_at: null }, orderBy: { sort_order: "asc" } },
        social_links: { where: { deleted_at: null }, orderBy: { sort_order: "asc" } },
      },
    }),
    followedIds(),
  ]);
  return rows.map((row) => ({
    id: String(row.id), name: row.display_name, username: row.username,
    ...(row.title ? { title: row.title } : {}), bio: row.bio ?? "", coverImage: row.cover_image ?? "",
    isFollowing: following.has(row.id),
    stats: { visitors: row.visitors_count, cafesReviewed: row._count.recommendations, followers: row._count.followers },
    recommendedPlaces: row.recommendations.map(({ restaurant }) => ({
      id: String(restaurant.id), slug: restaurant.slug, name: restaurant.name,
      image: restaurant.cover_image ?? "", ratingnumber: String(Number(restaurant.average_rating)),
      number: `(${restaurant.reviews_count})`, menu: restaurant.categories.map(({ category }) => category.name).join("، "),
      ...(restaurant.address ? { location: restaurant.address } : {}),
    })),
    videos: row.videos.map((video) => ({ id: String(video.id), thumbnail: video.thumbnail, ...(video.video_url ? { videoUrl: video.video_url } : {}), viewsCount: video.views_count })),
    socialLinks: Object.fromEntries(row.social_links.map((link) => [link.platform, link.url])),
  }));
}

export async function getBloggerProfile(id: string): Promise<BloggerProfile | null> {
  const bloggerId = z.coerce.number().int().positive().parse(id);
  const [row, following] = await Promise.all([
    prisma.blogger_profiles.findFirst({ where: { id: bloggerId, deleted_at: null, is_active: true } }), followedIds(),
  ]);
  if (!row) return null;
  return { id: String(row.id), name: row.display_name, username: row.username, ...(row.title ? { title: row.title } : {}), bio: row.bio ?? "", coverImage: row.cover_image ?? "", isFollowing: following.has(row.id) };
}

export async function getBloggerStats(id: string): Promise<BloggerStats | null> {
  const bloggerId = z.coerce.number().int().positive().parse(id);
  const row = await prisma.blogger_profiles.findFirst({ where: { id: bloggerId, deleted_at: null, is_active: true }, select: { visitors_count: true, _count: { select: { followers: true, recommendations: true } } } });
  return row ? { visitors: row.visitors_count, cafesReviewed: row._count.recommendations, followers: row._count.followers } : null;
}

export async function getBloggerRecommendedPlaces(id: string): Promise<BloggerRecommendedPlace[]> {
  const bloggerId = z.coerce.number().int().positive().parse(id);
  const rows = await prisma.blogger_recommendations.findMany({ where: { blogger_id: bloggerId, deleted_at: null, blogger: { deleted_at: null, is_active: true }, restaurant: { deleted_at: null, is_active: true } }, orderBy: { sort_order: "asc" }, include: { restaurant: { include: { categories: { include: { category: true } } } } } });
  return rows.map(({ restaurant }) => ({ id: String(restaurant.id), slug: restaurant.slug, name: restaurant.name, image: restaurant.cover_image ?? "", ratingnumber: String(Number(restaurant.average_rating)), number: `(${restaurant.reviews_count})`, menu: restaurant.categories.map(({ category }) => category.name).join("، "), ...(restaurant.address ? { location: restaurant.address } : {}) }));
}

export async function getBloggerVideos(id: string): Promise<BloggerVideo[]> {
  const bloggerId = z.coerce.number().int().positive().parse(id);
  const rows = await prisma.blogger_videos.findMany({ where: { blogger_id: bloggerId, deleted_at: null, blogger: { deleted_at: null, is_active: true } }, orderBy: { sort_order: "asc" } });
  return rows.map((row) => ({ id: String(row.id), thumbnail: row.thumbnail, ...(row.video_url ? { videoUrl: row.video_url } : {}), viewsCount: row.views_count }));
}

export async function getBloggerSocialLinks(id: string): Promise<BloggerSocialLinks> {
  const bloggerId = z.coerce.number().int().positive().parse(id);
  const rows = await prisma.blogger_social_links.findMany({ where: { blogger_id: bloggerId, deleted_at: null, blogger: { deleted_at: null, is_active: true } }, orderBy: { sort_order: "asc" } });
  return Object.fromEntries(rows.map((row) => [row.platform, row.url]));
}

export async function toggleBloggerFollow(id: string) {
  const bloggerId = z.coerce.number().int().positive().parse(id);
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("UNAUTHORIZED");
  const blogger = await prisma.blogger_profiles.findFirst({ where: { id: bloggerId, deleted_at: null, is_active: true }, select: { id: true } });
  if (!blogger) throw new Error("BLOGGER_NOT_FOUND");
  const key = { blogger_id_user_id: { blogger_id: bloggerId, user_id: userId } };
  const existing = await prisma.blogger_follows.findUnique({ where: key });
  if (existing) await prisma.blogger_follows.delete({ where: key });
  else await prisma.blogger_follows.create({ data: { blogger_id: bloggerId, user_id: userId } });
  revalidatePath(`/bloggers/${bloggerId}`); revalidatePath("/bloggers");
  return { isFollowing: !existing };
}
