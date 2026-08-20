import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ reviewId: string }> };

export const DELETE = withAuth(async (_request, user, context?: Params) => {
  const { reviewId } = await context!.params;
  const result = await prisma.restaurant_reviews.updateMany({ where: { id: Number(reviewId), user_id: user.userId, deleted_at: null }, data: { deleted_at: new Date() } });
  return result.count ? NextResponse.json({ success: true }) : NextResponse.json({ message: "دیدگاه پیدا نشد" }, { status: 404 });
}, [1, 2]);
