import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req) => {
    const searchParams = new URL(req.url).searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const total = await prisma.sizes.count();

    const sizes = await prisma.sizes.findMany({
      orderBy: {
        sort_order: "asc",
      },
      skip,
      take: limit,
    });

    const hasMore = skip + sizes.length < total;

    return NextResponse.json({
      data: sizes,
      meta: {
        total,
        page,
        limit,
        hasMore,
      },
    });
  },
  [2],
);

export const POST = withAuth(
  async (req) => {
    const body = await req.json();

    const size = await prisma.sizes.create({
      data: {
        name: body.name,
        sort_order: body.sortOrder,
      },
    });

    return NextResponse.json(size);
  },
  [2],
);
