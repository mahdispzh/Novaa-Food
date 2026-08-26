import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
type Params = { params: Promise<{ bloggerId: string }> };
export const PUT = withAuth(async (request, _user, context?: Params) => { const { bloggerId } = await context!.params; return NextResponse.json(await prisma.blogger_profiles.update({ where: { id: Number(bloggerId) }, data: { ...(await request.json()), updated_at: new Date() } })); }, [2]);
export const DELETE = withAuth(async (_request, _user, context?: Params) => { const { bloggerId } = await context!.params; const result = await prisma.blogger_profiles.updateMany({ where: { id: Number(bloggerId), deleted_at: null }, data: { deleted_at: new Date(), is_active: false } }); return result.count ? NextResponse.json({ success: true }) : NextResponse.json({ message: "بلاگر پیدا نشد" }, { status: 404 }); }, [2]);
