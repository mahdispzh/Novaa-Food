import { getBloggers } from "@/src/app/(landing)/bloggers/_services/bloggers.server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: await getBloggers() });
}
