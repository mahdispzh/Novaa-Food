import { getRestaurantCategories } from "@/src/app/(landing)/resturants/_services/restaurants.server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: await getRestaurantCategories() });
}
