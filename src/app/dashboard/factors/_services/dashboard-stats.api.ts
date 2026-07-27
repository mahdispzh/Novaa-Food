// _services/dashboard-stats.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface OrdersSummary {
  totalOrders: number;
  todayOrders: number;
  yesterdayOrders: number;
  thisWeekOrders: number;
  thisMonthOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  preparingOrders: number;
  readyToShipOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  returnedOrders: number;
  paidOrders: number;
  unpaidOrders: number;
  totalRevenue: number;
  todayRevenue: number;
  yesterdayRevenue: number;
  averageOrderValue: number;
}

export interface PaymentsSummary {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  unspecifiedPayments: number;
  totalIncome: number;
  todayIncome: number;
  averagePayment: number;
  cashPayments: number;
  onlinePayments: number;
  paidToday: number;
  paidThisMonth: number;
}

export interface ProductsSummary {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  discountedProducts: number;
  noDiscountProducts: number;
  totalVariants: number;
  totalStock: number;
  outOfStockVariants: number;
  lowStockVariants: number;
  criticalStockVariants: number;
}

// نکته: بک‌اند این ۳ endpoint، آمار رو داخل یه کلید "summary" برمی‌گردونه
// (یعنی { summary: {...} })، پس بعد از fetcher همون کلید رو استخراج می‌کنیم
// تا مقدار برگشتی از هوک‌ها دقیقاً همون شکل قبلی (OrdersSummary/... مستقیم) بمونه.
// اگه بک‌اند این wrapper رو نداره، فقط کافیه ".summary" رو از این ۳ تابع حذف کنی.

export const getOrdersSummary = async () => {
  const res = await fetcher<{ summary: OrdersSummary }>(() =>
    apiClient.get("protected/admin-overview/orders"),
  );
  return res.summary;
};

export const getPaymentsSummary = async () => {
  const res = await fetcher<{ summary: PaymentsSummary }>(() =>
    apiClient.get("protected/admin-overview/payments"),
  );
  return res.summary;
};

export const getProductsSummary = async () => {
  const res = await fetcher<{ summary: ProductsSummary }>(() =>
    apiClient.get("protected/admin-overview/products"),
  );
  return res.summary;
};