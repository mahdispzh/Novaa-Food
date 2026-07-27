import { prisma } from "@/prisma/prisma";

export async function getUserSummary() {
  const [
    totalUsers,
    todayUsers,
    yesterdayUsers,
    thisWeekUsers,
    thisMonthUsers,

    totalAdmins,
    totalCustomers,

    usersWithOrders,
    usersWithoutOrdersCount,

    usersWithAddress,
    usersWithoutAddressCount,

    usersWithRecentlyViewed,
    usersWithRecentlySearch,
  ] = await Promise.all([
    prisma.users.count(),

    prisma.users.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.users.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000),
          lt: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    prisma.users.count({
      where: {
        created_at: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),

    prisma.users.count({
      where: {
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),

    prisma.users.count({
      where: {
        role: 2,
      },
    }),

    prisma.users.count({
      where: {
        role: 1,
      },
    }),

    prisma.users.count({
      where: {
        orders: {
          some: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        orders: {
          none: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        user_addresses: {
          some: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        user_addresses: {
          none: {},
        },
      },
    }),

    prisma.users.count({
      where: {
        recently_viewed: {
          isEmpty: false,
        },
      },
    }),

    prisma.users.count({
      where: {
        recently_search: {
          isEmpty: false,
        },
      },
    }),
  ]);

  return {
    totalUsers,
    todayUsers,
    yesterdayUsers,
    thisWeekUsers,
    thisMonthUsers,

    totalAdmins,
    totalCustomers,

    usersWithOrders,
    usersWithoutOrdersCount,

    usersWithAddress,
    usersWithoutAddressCount,

    usersWithRecentlyViewed,
    usersWithRecentlySearch,
  };
}

/**
 * خروجی خلاصه کاربران
 *
 * totalUsers
 * تعداد کل کاربران
 *
 * todayUsers
 * تعداد کاربران ثبت‌نام شده امروز
 *
 * yesterdayUsers
 * تعداد کاربران ثبت‌نام شده دیروز
 *
 * thisWeekUsers
 * تعداد کاربران ثبت‌نام شده در ۷ روز اخیر
 *
 * thisMonthUsers
 * تعداد کاربران ثبت‌نام شده در ماه جاری
 *
 * totalAdmins
 * تعداد ادمین‌ها
 *
 * totalCustomers
 * تعداد مشتریان
 *
 * usersWithOrders
 * تعداد کاربران دارای سفارش
 *
 * usersWithoutOrdersCount
 * تعداد کاربران بدون سفارش
 *
 * usersWithAddress
 * تعداد کاربران دارای آدرس
 *
 * usersWithoutAddressCount
 * تعداد کاربران بدون آدرس
 *
 * usersWithRecentlyViewed
 * تعداد کاربران دارای تاریخچه بازدید
 *
 * usersWithRecentlySearch
 * تعداد کاربران دارای تاریخچه جستجو
 */