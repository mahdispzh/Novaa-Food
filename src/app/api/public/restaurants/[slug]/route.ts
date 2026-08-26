import { getRestaurantDetail } from "@/src/app/(landing)/restaurant-detail/_services/restaurant-detail.server";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = await getRestaurantDetail(slug);
  return restaurant ? NextResponse.json(restaurant) : NextResponse.json({ message: "رستوران پیدا نشد" }, { status: 404 });
}
