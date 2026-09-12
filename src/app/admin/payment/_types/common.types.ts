// src/app/profile/payment/_types/common.types.ts

export type Step =
  | "order-summary"
  | "shipping-method"
  | "payment-method"
  | "payment-gateway"
  | "success";

export type ShippingMethodType = "regular" | "express";
export type GatewayType = "pasargad" | "saman";