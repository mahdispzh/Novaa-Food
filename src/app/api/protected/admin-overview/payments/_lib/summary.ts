// api/protected/admin-overview/payments/_lib/summary.ts
import { prisma } from "@/prisma/prisma";

export async function getPaymentsSummary() {
  const [
    totalPayments,
    successfulPayments,
    failedPayments,
    pendingPayments,
    unspecifiedPayments, // ✅ status: 3
    totalIncome,
    todayIncome,
    averagePayment,
    cashPayments,
    onlinePayments,
    paidToday,
    paidThisMonth,
  ] = await Promise.all([
    prisma.payments.count(),

    prisma.payments.count({ where: { status: 1 } }),
    prisma.payments.count({ where: { status: 2 } }),
    prisma.payments.count({ where: { status: 0 } }),
    prisma.payments.count({ where: { status: 3 } }), // ✅ نامشخص

    prisma.payments.aggregate({
      where: { status: 1 },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: {
        status: 1,
        created_at: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
      _sum: { amount: true },
    }),

    prisma.payments.aggregate({
      where: { status: 1 },
      _avg: { amount: true },
    }),

    prisma.payments.count({ where: { payment_method: "cash" } }),
    prisma.payments.count({ where: { payment_method: "online" } }),

    prisma.payments.count({
      where: {
        status: 1,
        created_at: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),

    prisma.payments.count({
      where: {
        status: 1,
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  ]);

  return {
    totalPayments,
    successfulPayments,
    failedPayments,
    pendingPayments,
    unspecifiedPayments, // ✅
    totalIncome: totalIncome._sum.amount ?? 0,
    todayIncome: todayIncome._sum.amount ?? 0,
    averagePayment: Math.round(averagePayment._avg.amount ?? 0),
    cashPayments,
    onlinePayments,
    paidToday,
    paidThisMonth,
  };
}