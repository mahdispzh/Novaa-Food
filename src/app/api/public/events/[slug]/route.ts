import { getEvent } from "@/src/app/(landing)/events/_services/events.server";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  return event ? NextResponse.json(event) : NextResponse.json({ message: "رویداد پیدا نشد" }, { status: 404 });
}
