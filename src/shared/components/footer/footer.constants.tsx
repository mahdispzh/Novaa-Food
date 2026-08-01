// _constants/footer._constants.ts

import { FeatureItem, FooterItem } from "./footer.types";

// آیتم‌های ویژگی‌های فوتر
export const features: FeatureItem[] = [
  { key: "fastShipping" },
  {
    key: "returnGuarantee",
  },
  {
    key: "specialPackaging",
  },
  { key: "support" },
];

// آیتم‌های فروشگاه
export const shopItems: FooterItem[] = [
  { key: "shopNewProducts", href: "/products" },
  { key: "shopWomenBags", href: "/products" },
  { key: "shopWomenShoes", href: "/products" },
  { key: "shopPants", href: "/products" },
  { key: "shopBlouse", href: "/products" },
  { key: "shopDiscounts", href: "/products" },
];

// آیتم‌های خدمات مشتریان
export const customerItems: FooterItem[] = [
  { key: "customerOrderTracking", href: "/profile/orders" },
  { key: "customerReturnPolicy", href: "/faq" },
  { key: "customerFaq", href: "/faq" },
  { key: "customerContactUs", href: "/about-us" },
];

// آیتم‌های برند
export const brandItems: FooterItem[] = [
  { key: "brandAboutUs", href: "/about-us" },
  { key: "brandBlog", href: "/blogs" },
  { key: "brandPrivacy", href: "/terms" },
];

// کامپوننت جداکننده عمودی (با export const)
export const VerticalSeparator = () => {
  return <div className="h-5 w-px bg-gray" />;
};
