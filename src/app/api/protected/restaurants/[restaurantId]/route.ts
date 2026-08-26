import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ restaurantId: string }> };

export const GET = withAuth(async (_request, _user, context?: Params) => { const { restaurantId } = await context!.params; const row = await prisma.restaurants.findFirst({ where: { id: Number(restaurantId), deleted_at: null }, include: { categories: { include: { category: true } }, amenities: { include: { amenity: true } }, hours: true, images: { where: { deleted_at: null } }, menu_items: { where: { deleted_at: null } } } }); return row ? NextResponse.json(row) : NextResponse.json({ message: "رستوران پیدا نشد" }, { status: 404 }); }, [2]);

export const PUT = withAuth(async (request, _user, context?: Params) => { const { restaurantId } = await context!.params; const id = Number(restaurantId); const body = await request.json(); const { categoryIds, amenityIds, ...data } = body; const row = await prisma.restaurants.update({ where: { id }, data: { ...data, updated_at: new Date(), ...(Array.isArray(categoryIds) ? { categories: { deleteMany: {}, create: categoryIds.map((category_id: number) => ({ category_id })) } } : {}), ...(Array.isArray(amenityIds) ? { amenities: { deleteMany: {}, create: amenityIds.map((amenity_id: number) => ({ amenity_id })) } } : {}) } }); return NextResponse.json(row); }, [2]);

export const DELETE = withAuth(async (_request, _user, context?: Params) => { const { restaurantId } = await context!.params; const result = await prisma.restaurants.updateMany({ where: { id: Number(restaurantId), deleted_at: null }, data: { deleted_at: new Date(), is_active: false } }); return result.count ? NextResponse.json({ success: true }) : NextResponse.json({ message: "رستوران پیدا نشد" }, { status: 404 }); }, [2]);
