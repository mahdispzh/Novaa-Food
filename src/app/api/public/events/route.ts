import { getEvents } from "@/src/app/(landing)/events/_services/events.server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  return NextResponse.json(await getEvents({ page: Number(query.get("page") ?? 1), limit: Number(query.get("limit") ?? 12), upcomingOnly: query.get("upcoming") !== "false", ...(query.has("featured") ? { featured: query.get("featured") === "true" } : {}) }));
}
