import { getBloggers } from "@/src/app/(landing)/bloggers/_services/bloggers.service";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: await getBloggers() });
}
