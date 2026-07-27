import { prisma } from "@/prisma/prisma";

export async function getProductsSummary() {
  const [
    totalProducts,
    activeProducts,
    inactiveProducts,
    discountedProducts,
    noDiscountProducts,
    totalVariants,
    stockAggregate,
    outOfStockVariants,
    lowStockVariants,
    criticalStockVariants,
  ] = await Promise.all([
    prisma.products.count(),

    prisma.products.count({
      where: { status: 1 },
    }),

    prisma.products.count({
      where: { status: 0 },
    }),

    prisma.products.count({
      where: {
        discount: {
          gt: 0,
        },
      },
    }),

    prisma.products.count({
      where: {
        OR: [{ discount: 0 }, { discount: null }],
      },
    }),

    prisma.product_variants.count(),

    prisma.product_variants.aggregate({
      _sum: {
        stock: true,
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: 0,
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: {
          gt: 0,
          lte: 5,
        },
      },
    }),

    prisma.product_variants.count({
      where: {
        stock: {
          gt: 0,
          lte: 2,
        },
      },
    }),
  ]);

  return {
    totalProducts,
    activeProducts,
    inactiveProducts,

    discountedProducts,
    noDiscountProducts,

    totalVariants,

    totalStock: stockAggregate._sum.stock ?? 0,

    outOfStockVariants,
    lowStockVariants,
    criticalStockVariants,
  };
}

/**
 * خروجی Summary
 *
 * totalProducts          => تعداد کل محصولات
 * activeProducts         => تعداد محصولات فعال
 * inactiveProducts       => تعداد محصولات غیرفعال
 * discountedProducts     => تعداد محصولات دارای تخفیف
 * noDiscountProducts     => تعداد محصولات بدون تخفیف
 * totalVariants          => تعداد کل واریانت‌ها
 * totalStock             => مجموع موجودی تمام واریانت‌ها
 * outOfStockVariants     => تعداد واریانت‌های ناموجود
 * lowStockVariants       => تعداد واریانت‌های کم موجودی
 * criticalStockVariants  => تعداد واریانت‌های بحرانی
 */
