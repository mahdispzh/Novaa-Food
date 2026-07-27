// _constants/cart-item-card.constants.ts

export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const SHIPPING_INFO = {
  storeName: "فروشگاه بونامی",
  guarantee: "گارانتی اصالت و سلامت فیزیکی کالا",
};

export const getImageUrl = (imageSrc: string, hasError: boolean): string => {
  return hasError || !imageSrc ? PLACEHOLDER_IMAGE : imageSrc;
};

export const getDiscountBadgeClass = (hasDiscount: boolean): string => {
  return hasDiscount ? "flex h-4 w-8 items-center justify-center rounded-sm bg-danger" : "";
};