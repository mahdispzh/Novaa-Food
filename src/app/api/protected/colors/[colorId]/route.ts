import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    colorId: string;
  }>;
};

export const GET = withAuth(
  async (req, user, context?: Params) => {
    const { colorId } = await context!.params;

    const color = await prisma.colors.findUnique({
      where: {
        id: Number(colorId),
      },
    });

    return NextResponse.json(color);
  },
  [2],
);

export const PUT = withAuth(
  async (req: NextRequest, user, context?: Params) => {
    const { colorId } = await context!.params;

    const body = await req.json();

    const color = await prisma.colors.update({
      where: {
        id: Number(colorId),
      },

      data: {
        name: body.name,
        hex_code: body.hexCode,
      },
    });

    return NextResponse.json(color);
  },
  [2],
);

export const DELETE = withAuth(
  async (req: NextRequest, user, context?: Params) => {
    const { colorId } = await context!.params;

    await prisma.colors.delete({
      where: {
        id: Number(colorId),
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [2],
);
