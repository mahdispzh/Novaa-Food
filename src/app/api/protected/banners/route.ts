import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { deleteImage } from "@/src/shared/services/delete-image";
import { uploadImage } from "@/src/shared/services/upload-image";
import { NextResponse } from "next/server";

// =======================
// LIST BANNERS
// =======================
export const GET = withAuth(async () => {
  const banners = await prisma.banners.findMany({
    orderBy: {
      sort_order: "asc",
    },
  });

  return NextResponse.json(banners);
}, [2]);

// =======================
// CREATE BANNER
// =======================
export const POST = withAuth(
  async (req) => {
    let imageUrl = "";

    try {
      const formData = await req.formData();

      const imageFile = formData.get("image") as File | null;
      const alt = formData.get("alt") as string;
      const sort_order = Number(formData.get("sort_order"));
      const isActive =
        formData.get("isActive") === "true"
          ? true
          : formData.get("isActive") === "false"
            ? false
            : null;

      if (!imageFile) {
        return NextResponse.json(
          { message: "Image is required" },
          { status: 400 },
        );
      }

      // Upload image to ParsPack
      imageUrl = await uploadImage({
        file: imageFile,
        folder: "untitled-store/banners",
      });

      const banner = await prisma.banners.create({
        data: {
          image: imageUrl,
          alt,
          sort_order,
          isActive,
        },
      });

      return NextResponse.json(banner, { status: 201 });
    } catch (error) {
      console.error(error);

      if (imageUrl) {
        await deleteImage(imageUrl);
      }

      return NextResponse.json(
        { message: "Failed to create banner" },
        { status: 500 },
      );
    }
  },
  [2],
);
