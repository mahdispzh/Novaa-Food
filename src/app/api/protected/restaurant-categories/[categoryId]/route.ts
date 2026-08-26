import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
type Params = { params: Promise<{ categoryId: string }> };
export const PUT = withAuth(async (request, _user, context?: Params) => { const { categoryId } = await context!.params; return NextResponse.json(await prisma.restaurant_categories.update({ where: { id: Number(categoryId) }, data: { ...(await request.json()), updated_at: new Date() } })); }, [2]);
export const DELETE = withAuth(async (_request, _user, context?: Params) => { const { categoryId } = await context!.params; const result = await prisma.restaurant_categories.updateMany({ where: { id: Number(categoryId), deleted_at: null }, data: { deleted_at: new Date(), is_active: false } }); return result.count ? NextResponse.json({ success: true }) : NextResponse.json({ message: "دسته‌بندی پیدا نشد" }, { status: 404 }); }, [2]);
