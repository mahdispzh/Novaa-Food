import { prisma } from "@/prisma/prisma";

export async function getOrdersCharts(
  summary: {
    pendingOrders: number;
    confirmedOrders: number;
    preparingOrders: number;
    readyToShipOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    returnedOrders: number;
    paidOrders: number;
    unpaidOrders: number;
  },
  report: {
    topCustomers: {
      name: string | null;
      phone: string | null;
      _count: {
        orders: number;
      };
    }[];
  },
) {
  const [ordersLast30Days, revenueLast30Days, monthlyRevenue, monthlyOrders] =
    await Promise.all([
      prisma.$queryRaw<
        {
          date: string;
          count: number;
        }[]
      >`
      SELECT
        DATE(created_at) AS date,
        COUNT(*)::int AS count
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

      prisma.$queryRaw<
        {
          date: string;
          revenue: number;
        }[]
      >`
      SELECT
        DATE(created_at) AS date,
        SUM(total_price)::int AS revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 day'
        AND payment_status = 1
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

      prisma.$queryRaw<
        {
          month: string;
          revenue: number;
        }[]
      >`
      SELECT
        TO_CHAR(created_at,'YYYY-MM') AS month,
        SUM(total_price)::int AS revenue
      FROM orders
      WHERE payment_status = 1
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
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
      FROM orders
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
    ]);

  return {
    ordersLast30Days,

    revenueLast30Days,

    orderStatusChart: [
      {
        name: "منتظر تایید",
        value: summary.pendingOrders,
      },
      {
        name: "تایید اولیه",
        value: summary.confirmedOrders,
      },
      {
        name: "درحال آماده سازی",
        value: summary.preparingOrders,
      },
      {
        name: "آماده ارسال",
        value: summary.readyToShipOrders,
      },
      {
        name: "تحویل به پست",
        value: summary.shippedOrders,
      },
      {
        name: "تحویل به مشتری",
        value: summary.deliveredOrders,
      },
      {
        name: "مرجوع شده",
        value: summary.returnedOrders,
      },
    ],

    paymentStatusChart: [
      {
        name: "پرداخت نشده",
        value: summary.unpaidOrders,
      },
      {
        name: "پرداخت شده",
        value: summary.paidOrders,
      },
    ],

    monthlyRevenue,

    monthlyOrders,

    topCustomersChart: report.topCustomers.map((user) => ({
      name: user.name ?? user.phone ?? "بدون نام",
      orders: user._count.orders,
    })),
  };
}
/**
 * دریافت داده‌های نمودارهای داشبورد سفارش‌ها
 *
 * خروجی:
 * - ordersLast30Days: تعداد سفارش‌های ثبت شده در ۳۰ روز اخیر
 * - revenueLast30Days: درآمد روزانه ۳۰ روز اخیر (فقط سفارش‌های پرداخت شده)
 * - orderStatusChart: توزیع سفارش‌ها بر اساس وضعیت
 * - paymentStatusChart: توزیع سفارش‌های پرداخت شده و پرداخت نشده
 * - monthlyRevenue: درآمد ماهانه سفارش‌های پرداخت شده
 * - monthlyOrders: تعداد سفارش‌های ثبت شده در هر ماه
 * - topCustomersChart: ۱۰ مشتری با بیشترین تعداد سفارش
 */
