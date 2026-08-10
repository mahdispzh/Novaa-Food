/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/prisma/prisma";
import { withAuth } from "@/src/shared/components/auth/with-auth";
import { notifyVariantStockChange } from "@/src/shared/notifications/notification.service";
import { deleteImages } from "@/src/shared/services/delete-images";
import { uploadImages } from "@/src/shared/services/upload-images";
import { NextResponse } from "next/server";

export const GET = withAuth(
  async (req, user, ctx: any) => {
    const { slug } = await ctx.params;

    const product = await prisma.products.findUnique({
      where: {
        slug,
      },
      include: {
        brands: true,
        categories: true,
        product_variants: {
          where: {
            is_active: true,
          },
          include: {
            colors: true,
            sizes: true,
          },
        },
      },
    });

    const likesCount = await prisma.likes.count({
      where: {
        product_id: product?.id || 0,
      },
    });

    return NextResponse.json({
      ...product,
      likesCount,
    });
  },
  [2],
);

export const PUT = withAuth(
  async (req, user, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    let uploadedImages: string[] = [];

    try {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const description = formData.get("description") as string;
      const category_id = Number(formData.get("category_id"));
      const brand_id = Number(formData.get("brand_id"));
      const status = Number(formData.get("status"));
      const newSlug = formData.get("slug") as string;

      const variants = JSON.parse(formData.get("product_variants") as string);

      const imageFiles = formData.getAll("images") as File[];

      const product = await prisma.products.findUnique({
        where: {
          slug,
        },
        include: {
          product_variants: true,
        },
      });

      if (!product) {
        return NextResponse.json(
          {
            message: "محصول پیدا نشد",
          },
          {
            status: 404,
          },
        );
      }

      /**
       * ------------------------------------
       * بررسی تکراری بودن slug
       * ------------------------------------
       */

      if (newSlug !== slug) {
        const exist = await prisma.products.findUnique({
          where: {
            slug: newSlug,
          },
        });

        if (exist) {
          return NextResponse.json(
            {
              message: "Slug already exists",
            },
            {
              status: 409,
            },
          );
        }
      }

      /**
       * ------------------------------------
       * Upload Images (در صورت ارسال)
       * ------------------------------------
       */

      let images = product.images;

      if (imageFiles.length > 0) {
        uploadedImages = await uploadImages({
          files: imageFiles,
          folder: "untitled-store/product",
        });

        images = uploadedImages;
      }

      /**
       * ------------------------------------
       * بررسی تغییر موجودی
       * ------------------------------------
       */

      const stockChanges = variants
        .filter((variant: any) => variant.id)
        .map((variant: any) => {
          const previousVariant = product.product_variants.find(
            (item) => item.id === Number(variant.id),
          );

          return previousVariant
            ? {
                variantId: previousVariant.id,
                previousStock: previousVariant.stock,
                stock: Number(variant.stock),
              }
            : null;
        })
        .filter(
          (
            change: any,
          ): change is {
            variantId: number;
            previousStock: number;
            stock: number;
          } => Boolean(change && change.previousStock !== change.stock),
        );

      await prisma.$transaction(async (tx) => {
        /**
         * ------------------------------------
         * غیرفعال کردن Variant های حذف شده
         * ------------------------------------
         */

        const incomingVariantIds =
          variants?.filter((v: any) => v.id).map((v: any) => Number(v.id)) ??
          [];

        const removedVariantIds = product.product_variants
          .filter((variant) => !incomingVariantIds.includes(variant.id))
          .map((variant) => variant.id);

        if (removedVariantIds.length) {
          await tx.product_variants.updateMany({
            where: {
              id: {
                in: removedVariantIds,
              },
            },
            data: {
              is_active: false,
            },
          });
        }

        /**
         * ------------------------------------
         * Update / Create Variant
         * ------------------------------------
         */

        for (const variant of variants) {
          if (variant.id) {
            await tx.product_variants.update({
              where: {
                id: Number(variant.id),
              },
              data: {
                color_id: Number(variant.color_id),
                size_id: Number(variant.size_id),
                price: Number(variant.price),
                stock: Number(variant.stock),
                sku: variant.sku,
                is_active: true,
              },
            });
          } else {
            await tx.product_variants.create({
              data: {
                product_id: product.id,

                color_id: Number(variant.color_id),
                size_id: Number(variant.size_id),

                price: Number(variant.price),
                stock: Number(variant.stock),

                sku: variant.sku,

                is_active: true,
              },
            });
          }
        }

        /**
         * ------------------------------------
         * Update Product
         * ------------------------------------
         */

        await tx.products.update({
          where: {
            id: product.id,
          },
          data: {
            name,
            description,
            category_id,
            brand_id,
            status,
            slug: newSlug,
            images,
            updated_at: new Date(),
          },
        });
      });

      /**
       * ------------------------------------
       * حذف تصاویر قبلی بعد از موفقیت تراکنش
       * ------------------------------------
       */

      if (uploadedImages.length && product.images.length) {
        await deleteImages(product.images);
      }

      /**
       * ------------------------------------
       * ارسال نوتیفیکیشن تغییر موجودی
       * ------------------------------------
       */

      await Promise.all(
        stockChanges.map((change: any) =>
          notifyVariantStockChange({
            productId: product.id,
            productName: product.name,
            variantId: change.variantId,
            previousStock: change.previousStock,
            stock: change.stock,
          }),
        ),
      );

      const updatedProduct = await prisma.products.findUnique({
        where: {
          slug: newSlug,
        },
        include: {
          brands: true,
          categories: true,
          product_variants: {
            include: {
              colors: true,
              sizes: true,
            },
          },
        },
      });

      return NextResponse.json(updatedProduct);
    } catch (error) {
      console.error(error);

      /**
       * ------------------------------------
       * Rollback تصاویر آپلود شده
       * ------------------------------------
       */

      if (uploadedImages.length) {
        await deleteImages(uploadedImages);
      }

      return NextResponse.json(
        {
          message: "خطا در بروزرسانی محصول",
        },
        {
          status: 500,
        },
      );
    }
  },
  [2],
);

// export const DELETE = withAuth(
//   async (req, user, { params }: { params: Promise<{ slug: string }> }) => {
//     const { slug } = await params;

//     const product = await prisma.products.findUnique({
//       where: {
//         slug,
//       },
//       select: {
//         id: true,
//         is_active: true,
//       },
//     });

//     if (!product) {
//       return NextResponse.json(
//         {
//           message: "محصول پیدا نشد",
//         },
//         {
//           status: 404,
//         },
//       );
//     }

//     if (!product.is_active) {
//       return NextResponse.json(
//         {
//           message: "محصول قبلاً غیرفعال شده است",
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     await prisma.products.update({
//       where: {
//         id: product.id,
//       },
//       data: {
//         is_active: false,
//         updated_at: new Date(),
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "محصول با موفقیت غیرفعال شد",
//     });
//   },
//   [2],
// );
export const DELETE = withAuth(
  async (req, user, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    // ✅ استفاده از status به جای is_active
    const product = await prisma.products.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        status: true, // ← فیلد درست
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          message: "محصول پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    // ✅ بررسی وضعیت (فرض کنیم 1 = فعال، 0 = غیرفعال)
    if (product.status === 0) {
      return NextResponse.json(
        {
          message: "محصول قبلاً غیرفعال شده است",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.products.update({
      where: {
        id: product.id,
      },
      data: {
        status: 0, // غیرفعال کردن
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت غیرفعال شد",
    });
  },
  [2],
);
