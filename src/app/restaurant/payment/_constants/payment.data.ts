// src/app/profile/payment/_constants/payment.data.ts

import { Step } from "../_types/common.types";

export const STEPS: Step[] = [
  "order-summary", // 1: خلاصه سفارش
  "shipping-method", // 2: روش ارسال
  "payment-method", // 3: روش پرداخت
  "payment-gateway", // 4: درگاه پرداخت
  "success", // 5: نمایش وضعیت نهایی (موفق/ناموفق/نامشخص)
];
