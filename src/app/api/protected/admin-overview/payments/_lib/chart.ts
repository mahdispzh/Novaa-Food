import { prisma } from "@/prisma/prisma";

export async function getPaymentsCharts(
  summary: {
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
    unspecifiedPayments:number;
    cashPayments: number;
    onlinePayments: number;
  },
  report: {
    biggestPayments: {
      id: number;
      amount: number;
    }[];
  },
) {
  const [paymentsLast30Days, incomeLast30Days, monthlyIncome, monthlyPayments] =
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
      FROM payments
      WHERE created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

      prisma.$queryRaw<
        {
          date: string;
          income: number;
        }[]
      >`
      SELECT
        DATE(created_at) AS date,
        SUM(amount)::int AS income
      FROM payments
      WHERE status = 1
        AND created_at >= NOW() - INTERVAL '30 day'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at);
    `,

      prisma.$queryRaw<
        {
          month: string;
          income: number;
        }[]
      >`
      SELECT
        TO_CHAR(created_at,'YYYY-MM') AS month,
        SUM(amount)::int AS income
      FROM payments
      WHERE status = 1
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
      FROM payments
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12;
    `,
    ]);

  return {
    paymentsLast30Days,

    incomeLast30Days,

    paymentStatusChart: [
      {
        name: "موفق",
        value: summary.successfulPayments,
      },
      {
        name: "ناموفق",
        value: summary.failedPayments,
      },
      {
        name: "در انتظار",
        value: summary.pendingPayments,
      },
      ,
      {
        name: "نامشخص ",
        value: summary.unspecifiedPayments,
      },
    ],

    paymentMethodChart: [
      {
        name: "آنلاین",
        value: summary.onlinePayments,
      },
      {
        name: "نقدی",
        value: summary.cashPayments,
      },
    ],

    monthlyIncome,

    monthlyPayments,

    biggestPaymentsChart: report.biggestPayments.map((payment) => ({
      name: `#${payment.id}`,
      amount: payment.amount,
    })),
  };
}
/**
 * دریافت داده‌های نمودارهای داشبورد پرداخت‌ها
 *
 * خروجی:
 * - paymentsLast30Days: تعداد پرداخت‌های ثبت شده در ۳۰ روز اخیر
 * - incomeLast30Days: درآمد روزانه ۳۰ روز اخیر از پرداخت‌های موفق
 * - paymentStatusChart: توزیع وضعیت پرداخت‌ها (موفق، ناموفق، در انتظار)
 * - paymentMethodChart: توزیع روش‌های پرداخت (آنلاین، نقدی)
 * - monthlyIncome: درآمد ماهانه پرداخت‌های موفق
 * - monthlyPayments: تعداد پرداخت‌ها در هر ماه
 * - biggestPaymentsChart: ۱۰ پرداخت با بیشترین مبلغ
 */
