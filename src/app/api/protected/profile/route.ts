import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user) => {
    const profile = await prisma.users.findUnique({
      where: {
        id: user.userId,
      },

      select: {
        id: true,
        name: true,
        phone: true,
        mail: true,
        role: true,
        created_at: true,
      },
    });

    return NextResponse.json(profile);
  },
  [1, 2],
);

export const PUT = withAuth(
  async (req, user) => {
    const body = await req.json();

    const profile = await prisma.users.update({
      where: {
        id: user.userId,
      },

      data: {
        name: body.name,
        mail: body.mail,
      },
    });

    return NextResponse.json(profile);
  },
  [1, 2],
);

export const DELETE = withAuth(
  async (req, user) => {
    await prisma.users.delete({
      where: {
        id: user.userId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [1, 2],
);
