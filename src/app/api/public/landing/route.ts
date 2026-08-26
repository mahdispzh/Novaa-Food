import { getLandingHome } from "@/src/app/(landing)/(home)/_services/home.server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getLandingHome());
}
