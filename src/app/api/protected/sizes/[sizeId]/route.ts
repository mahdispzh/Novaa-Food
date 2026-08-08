import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    sizeId: string;
  }>;
};

export const GET = withAuth(
  async (req, user, context?: Params) => {
    const { sizeId } = await context!.params;

    const size = await prisma.sizes.findUnique({
      where: {
        id: Number(sizeId),
      },
    });

    return NextResponse.json(size);
  },
  [2],
);

export const PUT = withAuth(
  async (req, user, context?: Params) => {
    const { sizeId } = await context!.params;

    const body = await req.json();

    const size = await prisma.sizes.update({
      where: {
        id: Number(sizeId),
      },

      data: {
        name: body.name,
        sort_order: body.sortOrder,
      },
    });

    return NextResponse.json(size);
  },
  [2],
);

export const DELETE = withAuth(
  async (req, user, context?: Params) => {
    const { sizeId } = await context!.params;

    await prisma.sizes.delete({
      where: {
        id: Number(sizeId),
      },
    });

    return NextResponse.json({
      success: true,
    });
  },
  [2],
);
