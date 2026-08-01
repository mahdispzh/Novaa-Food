// _constants/status-info-products._constants.ts
import { StatusInfoProductsVariant } from "./status-info-products.types";

// کانفیگ هر واریانت (آیکون، رنگ، مقدار پیش‌فرض، لیبل پیش‌فرض)
export const variantConfig: Record<
  StatusInfoProductsVariant,
  {
    color: string;
    defaultValue: number;
    defaultLabel: string;
  }
> = {
  success: {
    color: "text-success",
    defaultValue: 12,
    defaultLabel: "محصول فعال است",
  },
  warning: {
    color: "text-primary",
    defaultValue: 3,
    defaultLabel: "محصول در وضعیت انتظار",
  },
  danger: {
    color: "text-danger",
    defaultValue: 0,
    defaultLabel: "محصول غیرفعال است",
  },
  refresh: {
    color: "text-warning",
    defaultValue: 1,
    defaultLabel: "در حال بروزرسانی",
  },
} as const;
