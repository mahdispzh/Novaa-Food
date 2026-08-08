import { prisma } from "@/prisma/prisma";

import {
  signAccessToken,
  signRefreshToken,
} from "@/src/shared/components/auth/jwt";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone, code } = await req.json();
  console.log("c", code);
  // 1. find otp
  const otp = await prisma.otp_codes.findFirst({
    where: {
      phone,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  // 2. validate otp
  if (!otp || otp.otp_hash !== code || otp.expires_at < new Date()) {
    return NextResponse.json(
      {
        error: "Invalid OTP",
      },
      {
        status: 400,
      },
    );
  }

  // 3. find or create user
  let isNewUser = false;

  let user = await prisma.users.findUnique({
    where: {
      phone,
    },
    include: {
      carts: true,
    },
  });

  if (!user) {
    isNewUser = true;

    user = await prisma.users.create({
      data: {
        phone,
        role: 1,
        carts: {
          create: {
            created_at: new Date(),
          },
        },
      },
      include: {
        carts: true,
      },
    });
  }

  // 4. generate tokens
  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
    name: user.name,
  });

  const refreshToken = signRefreshToken({
    userId: user.id,
    role: user.role,
    name: user.name,
  });

  const sessionExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // 5. session rotation
  const existingSession = await prisma.auth_sessions.findFirst({
    where: {
      user_id: user.id,
    },
  });

  if (existingSession) {
    await prisma.auth_sessions.update({
      where: {
        id: existingSession.id,
      },
      data: {
        refresh_token_hash: refreshToken,

        expires_at: sessionExpiresAt,
      },
    });
  } else {
    await prisma.auth_sessions.create({
      data: {
        user_id: user.id,

        refresh_token_hash: refreshToken,

        expires_at: sessionExpiresAt,

        created_at: new Date(),
      },
    });
  }

  // 6. delete otp
  await prisma.otp_codes.delete({
    where: {
      id: otp.id,
    },
  });

  // 7. response
  const redirectMap: Record<number, string> = {
    1: "/profile",
    2: "/dashboard",
  };
  const redirectTo = redirectMap[user.role] ?? "/profile";
  const response = NextResponse.json({
    accessToken,

    user,
    redirectTo,
    isNewUser,
  });

  // 8. cookie
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "lax",

    path: "/",

    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
