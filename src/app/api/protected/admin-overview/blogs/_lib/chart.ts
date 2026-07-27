import { prisma } from "@/prisma/prisma";

export async function getBlogsCharts(
  summary: {
    publishedBlogs: number;
    draftBlogs: number;
  },
  report: {
    topViewedBlogs: {
      title: string;
      view: number | null;
    }[];
    topLikedBlogs: {
      title: string;
      likes: number | null;
    }[];
    mostCommentedBlogs: {
      title: string;
      comments: number | null;
    }[];
  },
) {
  const [blogsLast30Days, monthlyBlogs, topAuthorsChart] = await Promise.all([
    prisma.$queryRaw<
      {
        date: string;
        count: number;
      }[]
    >`
        SELECT
          DATE(created_at) AS date,
          COUNT(*)::int AS count
        FROM blogs
        WHERE created_at >= NOW() - INTERVAL '30 day'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at);
      `,

    prisma.$queryRaw<
      {
        month: string;
        count: number;
      }[]
    >`
        SELECT
          TO_CHAR(created_at,'YYYY-MM') AS month,
          COUNT(*)::int AS count
        FROM blogs
        GROUP BY month
        ORDER BY month DESC
        LIMIT 12;
      `,

    prisma.users.findMany({
      take: 10,
      orderBy: {
        blogs: {
          _count: "desc",
        },
      },
      select: {
        name: true,
        _count: {
          select: {
            blogs: true,
          },
        },
      },
    }),
  ]);

  return {
    blogsLast30Days,

    blogsByStatus: [
      {
        name: "منتشر شده",
        value: summary.publishedBlogs,
      },
      {
        name: "پیش نویس",
        value: summary.draftBlogs,
      },
    ],

    monthlyBlogs,

    topViewedChart: report.topViewedBlogs.map((blog) => ({
      name: blog.title,
      views: blog.view ?? 0,
    })),

    topLikedChart: report.topLikedBlogs.map((blog) => ({
      name: blog.title,
      likes: blog.likes ?? 0,
    })),

    mostCommentedChart: report.mostCommentedBlogs.map((blog) => ({
      name: blog.title,
      comments: blog.comments ?? 0,
    })),

    topAuthorsChart: topAuthorsChart.map((user) => ({
      name: user.name ?? "بدون نام",
      blogs: user._count.blogs,
    })),
  };
}

/**
 * دریافت داده‌های نمودارهای داشبورد وبلاگ
 *
 * خروجی:
 * - blogsLast30Days: تعداد وبلاگ‌های ایجاد شده در ۳۰ روز اخیر
 * - blogsByStatus: نسبت وبلاگ‌های منتشر شده و پیش‌نویس
 * - monthlyBlogs: تعداد وبلاگ‌های ایجاد شده در ۱۲ ماه اخیر
 * - topViewedChart: ۱۰ وبلاگ با بیشترین بازدید
 * - topLikedChart: ۱۰ وبلاگ با بیشترین لایک
 * - mostCommentedChart: ۱۰ وبلاگ با بیشترین کامنت
 * - topAuthorsChart: ۱۰ نویسنده با بیشترین تعداد وبلاگ
 */
