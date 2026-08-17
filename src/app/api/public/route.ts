import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    text: "Hello!",
    color: "#ff4500",
    size: "48px",
  });
}
