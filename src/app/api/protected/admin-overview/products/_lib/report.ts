import { prisma } from "@/prisma/prisma";

export async function getProductsReport() {
  const [
    topSellingProducts,
    topViewedProducts,
    topLikedProducts,
    newestProducts,
    outOfStockProducts,
    lowStockProducts,
    productsWithoutSales,
    productsWithoutViews,
    productsWithoutLikes,
  ] = await Promise.all([
    prisma.products.findMany({
      take: 10,
      orderBy: {
        sold_count: "desc",
      },
      select: {
        id: true,
        name: true,
        sold_count: true,
        views: true,
        discount: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        views: "desc",
      },
      select: {
        id: true,
        name: true,
        views: true,
        sold_count: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        name: true,
        images: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    }),

    prisma.products.findMany({
      take: 10,
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      where: {
        product_variants: {
          some: {
            stock: 0,
          },
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        images: true,
        product_variants: {
          select: {
            stock: true,
          },
        },
      },
    }),

    prisma.products.findMany({
      where: {
        product_variants: {
          some: {
            stock: {
              gt: 0,
              lte: 5,
            },
          },
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        images: true,
        product_variants: {
          select: {
            stock: true,
          },
        },
      },
    }),

    prisma.products.findMany({
      where: {
        OR: [
          {
            sold_count: 0,
          },
          {
            sold_count: null,
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        sold_count: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      where: {
        OR: [
          {
            views: 0,
          },
          {
            views: null,
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        name: true,
        views: true,
        images: true,
      },
    }),

    prisma.products.findMany({
      where: {
        likes: {
          none: {},
        },
      },
      take: 10,
      select: {
        id: true,
        name: true,
        images: true,
      },
    }),
  ]);

  return {
    topSellingProducts,

    topViewedProducts,

    topLikedProducts,

    newestProducts,

    outOfStockProducts,

    lowStockProducts,

    productsWithoutSales,

    productsWithoutViews,

    productsWithoutLikes,
  };
}
/**
 * دریافت گزارش‌های داشبورد محصولات
 *
 * خروجی:
 * - topSellingProducts: ۱۰ محصول با بیشترین فروش
 * - topViewedProducts: ۱۰ محصول با بیشترین بازدید
 * - topLikedProducts: ۱۰ محصول با بیشترین تعداد لایک
 * - newestProducts: ۱۰ محصول جدید
 * - outOfStockProducts: ۱۰ محصول دارای تنوع ناموجود
 * - lowStockProducts: ۱۰ محصول دارای تنوع با موجودی کم
 * - productsWithoutSales: ۱۰ محصول بدون فروش
 * - productsWithoutViews: ۱۰ محصول بدون بازدید
 * - productsWithoutLikes: ۱۰ محصول بدون لایک
 */
