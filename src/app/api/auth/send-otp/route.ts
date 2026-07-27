import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("send-otp api loaded!");

  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ message: "Phone is required" }, { status: 400 });
  }

  const otp = "0000";

  const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

  const existing = await prisma.otp_codes.findFirst({
    where: {
      phone,
    },
  });

  if (existing) {
    await prisma.otp_codes.update({
      where: {
        id: existing.id,
      },
      data: {
        otp_hash: otp,
        expires_at: expiresAt,
      },
    });
  } else {
    await prisma.otp_codes.create({
      data: {
        phone,
        attempts: 0,
        otp_hash: otp,
        expires_at: expiresAt,
        created_at: new Date(),
      },
    });
  }

  return NextResponse.json({
    success: true,
    message: "OTP sent",
  });
}
