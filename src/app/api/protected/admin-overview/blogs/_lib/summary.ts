import { prisma } from "@/prisma/prisma";

export async function getBlogsSummary() {
  const [
    totalBlogs,

    publishedBlogs,

    draftBlogs,

    totalViews,

    totalLikes,

    totalComments,

    blogsToday,

    blogsThisMonth,

    averageViews,

    averageLikes,
  ] = await Promise.all([
    prisma.blogs.count(),

    prisma.blogs.count({
      where: {
        status: 1,
      },
    }),

    prisma.blogs.count({
      where: {
        status: 0,
      },
    }),

    prisma.blogs.aggregate({
      _sum: {
        view: true,
      },
    }),

    prisma.blogs.aggregate({
      _sum: {
        likes: true,
      },
    }),

    prisma.blogs.aggregate({
      _sum: {
        comments: true,
      },
    }),

    prisma.blogs.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.blogs.count({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),

    prisma.blogs.aggregate({
      _avg: {
        view: true,
      },
    }),

    prisma.blogs.aggregate({
      _avg: {
        likes: true,
      },
    }),
  ]);

  return {
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    totalViews: totalViews._sum.view ?? 0,
    totalLikes: totalLikes._sum.likes ?? 0,
    totalComments: totalComments._sum.comments ?? 0,
    blogsToday,
    blogsThisMonth,
    averageViews: Math.round(averageViews._avg.view ?? 0),
    averageLikes: Math.round(averageLikes._avg.likes ?? 0),
  };
}
/**
 * دریافت خلاصه آماری وبلاگ‌ها
 *
 * خروجی:
 * - totalBlogs: تعداد کل وبلاگ‌ها
 * - publishedBlogs: تعداد وبلاگ‌های منتشرشده
 * - draftBlogs: تعداد پیش‌نویس‌ها
 * - totalViews: مجموع بازدید تمام وبلاگ‌ها
 * - totalLikes: مجموع لایک‌ها
 * - totalComments: مجموع کامنت‌ها
 * - blogsToday: تعداد وبلاگ‌های ایجاد شده امروز
 * - blogsThisMonth: تعداد وبلاگ‌های ایجاد شده در ماه جاری
 * - averageViews: میانگین بازدید هر وبلاگ
 * - averageLikes: میانگین لایک هر وبلاگ
 */
