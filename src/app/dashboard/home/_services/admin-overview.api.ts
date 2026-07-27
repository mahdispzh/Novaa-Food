// import { apiClient, fetcher } from "@/src/shared/api/fetcher";

// export interface AdminOverviewSummary {
//   totalProducts: number;
//   activeProducts: number;
//   inactiveProducts: number;
//   discountedProducts: number;
//   noDiscountProducts: number;
//   totalVariants: number;
//   totalStock: number;
//   outOfStockVariants: number;
//   lowStockVariants: number;
//   criticalStockVariants: number;
// }

// export interface AdminOverviewResponse {
//   summary: AdminOverviewSummary;
//   report: any;
//   charts: any;
// }

// export interface CategoriesOverviewSummary {
//   totalCategories: number;
//   rootCategories: number;
//   childCategories: number;
//   categoriesWithProducts: number;
//   emptyCategories: number;
//   totalProducts: number;
//   averageProductsPerCategory: number;
// }

// export interface CategoriesOverviewResponse {
//   summary: CategoriesOverviewSummary;
//   report: any;
//   charts: any;
// }

// export const getAdminOverview = () => {
//   return fetcher<AdminOverviewResponse>(() =>
//     apiClient.get("/protected/admin-overview/products"),
//   );
// };

// // ✅ جدید
// export const getCategoriesOverview = () => {
//   return fetcher<CategoriesOverviewResponse>(() =>
//     apiClient.get("/protected/admin-overview/categories"),
//   );
// };
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface AdminOverviewSummary {
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

export interface AdminOverviewResponse {
  summary: AdminOverviewSummary;
  report: any;
  charts: any;
}

export interface CategoriesOverviewSummary {
  totalCategories: number;
  rootCategories: number;
  childCategories: number;
  categoriesWithProducts: number;
  emptyCategories: number;
  totalProducts: number;
  averageProductsPerCategory: number;
}

export interface CategoriesOverviewResponse {
  summary: CategoriesOverviewSummary;
  report: any;
  charts: any;
}

// ✅ جدید
export interface OrdersOverviewSummary {
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

// ✅ جدید
export interface OrdersOverviewResponse {
  summary: OrdersOverviewSummary;
  report: any;
  charts: any;
}

export const getAdminOverview = () => {
  return fetcher<AdminOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/products"),
  );
};

export const getCategoriesOverview = () => {
  return fetcher<CategoriesOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/categories"),
  );
};

// ✅ جدید
export const getOrdersOverview = () => {
  return fetcher<OrdersOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/orders"),
  );
};
