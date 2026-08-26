import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";
type Params = { params: Promise<{ eventId: string }> };
export const PUT = withAuth(async (request, _user, context?: Params) => { const { eventId } = await context!.params; const body = await request.json(); for (const key of ["starts_at", "ends_at", "registration_deadline"]) if (body[key]) body[key] = new Date(body[key]); return NextResponse.json(await prisma.events.update({ where: { id: Number(eventId) }, data: { ...body, updated_at: new Date() } })); }, [2]);
export const DELETE = withAuth(async (_request, _user, context?: Params) => { const { eventId } = await context!.params; const result = await prisma.events.updateMany({ where: { id: Number(eventId), deleted_at: null }, data: { deleted_at: new Date(), status: 0 } }); return result.count ? NextResponse.json({ success: true }) : NextResponse.json({ message: "رویداد پیدا نشد" }, { status: 404 }); }, [2]);
