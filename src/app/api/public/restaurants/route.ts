import { getRestaurantCategories, getRestaurants } from "@/src/app/(landing)/resturants/_services/restaurants.server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const result = await getRestaurants({
    page: Number(query.get("page") ?? 1), limit: Number(query.get("limit") ?? 12),
    ...(query.get("search") ? { search: query.get("search")! } : {}),
    ...(query.get("category") ? { categorySlug: query.get("category")! } : {}),
    ...(query.get("city") ? { city: query.get("city")! } : {}),
    ...(query.has("featured") ? { featured: query.get("featured") === "true" } : {}),
  });
  return NextResponse.json(result);
}

export async function OPTIONS() {
  return NextResponse.json({ categories: await getRestaurantCategories() });
}
