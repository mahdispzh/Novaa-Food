// src/app/profile/payment/_constants/payment-status.constants.ts

export const FAILED_LIKE_VARIANTS = {
  unsuccess: {
    imageSrc: "images/payment-unsuccessful.svg",
    imageAlt: "پرداخت ناموفق",
    title: "متاسفانه پرداخت شما ناموفق بود!",
    titleColor: "danger" as const,
    message: "در صورت ناموفق بودن پرداخت به دلیل اختلال در بانک‌های ملی، صادرات و آینده، از سایر کارت‌های بانکی استفاده کنید.",
    buttonType: "secondary" as const,
  },
  unknown: {
    imageSrc: 'images/payment-unknown.svg',
    imageAlt: "پرداخت نامشخص",
    title: "متاسفانه پرداخت شما نامشخص بود!",
    titleColor: "secondary" as const,
    message: "در صورت ناموفق بودن پرداخت به دلیل اختلال در بانک‌های ملی، صادرات و آینده، از سایر کارت‌های بانکی استفاده کنید.",
    buttonType: "primary" as const,
  },
};