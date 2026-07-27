import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/auth/with-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    categoryId: string;
  }>;
};

export const GET = withAuth(
  async (req: NextRequest, _user, context?: Params) => {
    const { categoryId } = await context!.params;

    const id = Number(categoryId);

    const category = await prisma.categories.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  },
  [2],
);

import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";

export const PUT = withAuth(
  async (req: NextRequest, _user, context?: Params) => {
    const { categoryId } = await context!.params;

    const id = Number(categoryId);

    const category = await prisma.categories.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const parentId = formData.get("parentId") as string | null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = category.image;

    try {
      // -------------------------
      // upload new image
      // -------------------------
      if (imageFile && imageFile.size > 0) {
        const newImage = await uploadImage({
          file: imageFile,
          folder: "untitled-store/categories",
        });

        // delete old image
        if (category.image) {
          await deleteImage(category.image);
        }

        imageUrl = newImage;
      }

      // -------------------------
      // update category
      // -------------------------
      const updated = await prisma.categories.update({
        where: { id },
        data: {
          name,
          slug,
          description,
          image: imageUrl,
          parent_id: parentId ? Number(parentId) : null,
        },
      });

      return NextResponse.json(updated);
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { message: "خطا در آپدیت دسته‌بندی" },
        { status: 500 },
      );
    }
  },
  [2],
);

export const DELETE = withAuth(
  async (req: NextRequest, _user, context?: Params) => {
    const { categoryId } = await context!.params;

    const id = Number(categoryId);

    const category = await prisma.categories.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 },
      );
    }

    try {
      // -------------------------
      // delete image from storage
      // -------------------------
      if (category.image) {
        await deleteImage(category.image);
      }

      // -------------------------
      // delete category
      // -------------------------
      await prisma.categories.delete({
        where: { id },
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { message: "خطا در حذف دسته‌بندی" },
        { status: 500 },
      );
    }
  },
  [2],
);
