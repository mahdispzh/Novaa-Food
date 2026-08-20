import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ bloggerId: string }> };

export const POST = withAuth(async (_request, user, context?: Params) => {
  const { bloggerId } = await context!.params; const id = Number(bloggerId);
  const key = { blogger_id_user_id: { blogger_id: id, user_id: user.userId } };
  const existing = await prisma.blogger_follows.findUnique({ where: key });
  if (existing) await prisma.blogger_follows.delete({ where: key });
  else await prisma.blogger_follows.create({ data: { blogger_id: id, user_id: user.userId } });
  return NextResponse.json({ isFollowing: !existing });
}, [1, 2]);
