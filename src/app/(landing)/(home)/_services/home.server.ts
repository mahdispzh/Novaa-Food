"use server";

// src/app/(landing)/_services/home.api.ts

import { prisma } from "@/prisma/prisma";
import type {
  GetCategoriesParams,
  GetPublicProductsParams,
} from "../_types/landing.types";

export async function getLandingHome() {
  const [restaurantCategories, featuredEvents, nearbyRestaurants, popularRestaurants, bloggers] = await Promise.all([
    prisma.restaurant_categories.findMany({ where: { parent_id: null, is_active: true, deleted_at: null }, orderBy: { sort_order: "asc" }, take: 12, select: { id: true, name: true, slug: true, icon: true } }),
    prisma.events.findMany({ where: { status: 1, deleted_at: null, ends_at: { gte: new Date() } }, orderBy: [{ is_featured: "desc" }, { starts_at: "asc" }], take: 8, include: { restaurant: { select: { id: true, slug: true, name: true } } } }),
    prisma.restaurants.findMany({ where: { is_active: true, deleted_at: null, latitude: { not: null }, longitude: { not: null } }, orderBy: { created_at: "desc" }, take: 8, include: { categories: { include: { category: true } } } }),
    prisma.restaurants.findMany({ where: { is_active: true, deleted_at: null }, orderBy: [{ is_featured: "desc" }, { average_rating: "desc" }, { reviews_count: "desc" }], take: 8, include: { categories: { include: { category: true } } } }),
    prisma.blogger_profiles.findMany({ where: { is_active: true, deleted_at: null }, orderBy: [{ is_verified: "desc" }, { visitors_count: "desc" }], take: 8, select: { id: true, username: true, display_name: true, title: true, cover_image: true, _count: { select: { followers: true } } } }),
  ]);

  const mapRestaurant = (restaurant: (typeof nearbyRestaurants)[number]) => ({
    ...restaurant,
    latitude: restaurant.latitude === null ? null : Number(restaurant.latitude),
    longitude: restaurant.longitude === null ? null : Number(restaurant.longitude),
    average_rating: Number(restaurant.average_rating),
    categories: restaurant.categories.map(({ category }) => category),
  });

  return {
    categories: restaurantCategories,
    events: featuredEvents.map((event) => ({ ...event, latitude: event.latitude === null ? null : Number(event.latitude), longitude: event.longitude === null ? null : Number(event.longitude) })),
    nearbyRestaurants: nearbyRestaurants.map(mapRestaurant),
    popularRestaurants: popularRestaurants.map(mapRestaurant),
    bloggers: bloggers.map((blogger) => ({ id: blogger.id, username: blogger.username, display_name: blogger.display_name, title: blogger.title, cover_image: blogger.cover_image, followers_count: blogger._count.followers })),
  };
}
export async function getCategories({
  page = 1,
  limit = 10,
}: GetCategoriesParams = {}) {
  const skip = (page - 1) * limit;

  const [total, categories, productCounts] = await Promise.all([
    prisma.categories.count(),

    prisma.categories.findMany({
      orderBy: {
        id: "asc",
      },
    }),

    prisma.products.groupBy({
      by: ["category_id"],
      where: {
        status: 1,
        product_variants: {
          some: {
            is_active: true,
          },
        },
      },
      _count: {
        id: true,
      },
    }),
  ]);

  const productCountMap = new Map(
    productCounts.map((item) => [item.category_id, item._count.id]),
  );

  const result = categories
    .filter((c) => c.parent_id === null)
    .slice(skip, skip + limit)
    .map((parent) => {
      const children = categories
        .filter((c) => c.parent_id === parent.id)
        .map((child) => ({
          ...child,
          productsCount: productCountMap.get(child.id) ?? 0,
        }));

      return {
        ...parent,
        productsCount: productCountMap.get(parent.id) ?? 0,
        childrenCount: children.length,
        children,
      };
    });

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
      hasMore: skip + result.length < total,
    },
  };
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getPublicProducts({
  page = 1,
  limit = 10,
  search,
  color,
  size,
  minPrice,
  maxPrice,
  inStock,
  sort,
  categoryId,
}: GetPublicProductsParams = {}) {
  const skip = (page - 1) * limit;

  const colorIds = color?.split(",").map(Number);
  const sizeIds = size?.split(",").map(Number);

  const where: any = {
    status: 1,
    AND: [],
  };

  // Search
  if (search) {
    where.AND.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Category
  if (categoryId) {
    where.AND.push({
      category_id: categoryId,
    });
  }

  // Variant filters
  const hasVariantFilters =
    colorIds?.length ||
    sizeIds?.length ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    inStock;

  if (hasVariantFilters) {
    where.AND.push({
      product_variants: {
        some: {
          AND: [
            colorIds?.length
              ? {
                  color_id: {
                    in: colorIds,
                  },
                }
              : undefined,

            sizeIds?.length
              ? {
                  size_id: {
                    in: sizeIds,
                  },
                }
              : undefined,

            minPrice !== undefined || maxPrice !== undefined
              ? {
                  price: {
                    gte: minPrice,
                    lte: maxPrice,
                  },
                }
              : undefined,

            inStock
              ? {
                  stock: {
                    gt: 0,
                  },
                }
              : undefined,
          ].filter(Boolean),
        },
      },
    });
  }

  // Sorting
  let orderBy: any = {
    created_at: "desc",
  };

  switch (sort) {
    case "likes":
      orderBy = { likes: "desc" };
      break;

    case "views":
      orderBy = { views: "desc" };
      break;

    case "sold":
      orderBy = { sold_count: "desc" };
      break;

    case "discount":
      orderBy = { discount: "desc" };
      break;

    case "newest":
    default:
      orderBy = { created_at: "desc" };
  }

  const [total, products] = await Promise.all([
    prisma.products.count({
      where,
    }),

    prisma.products.findMany({
      where,
      skip,
      take: limit,
      orderBy,

      include: {
        product_variants: {
          include: {
            colors: true,
            sizes: true,
          },
        },
      },
    }),
  ]);

  return {
    data: products,
    meta: {
      total,
      page,
      limit,
      hasMore: skip + products.length < total,
    },
  };
}
export async function getBanners() {
  return {
    data: await prisma.banners.findMany({
      where: {
        is_active: true,
      },
    }),
  };
}
