import type { ComponentType } from "react";

import {
  CartIcon,
  CategoryIcon,
  ContentIcon,
  ExitIcon,
  PackageIcon,
  SettingIcon,
  ShopIcon,
  UserIcon,
  UserProfileIcon,
} from "../../constants/icons";

export interface SidebarItem {
  id: string;
  title: string;
  icon?: ComponentType<any>;
  href?: string;
  badge?: number; // اضافه شد
  items?: SidebarItem[];
}

export const SidebarDashboard: SidebarItem[] = [
 {
  id: "dashboard",
  title: "میزکار",
  icon: CategoryIcon,
  href: "/dashboard",
},
  {
    id: "shop",
    title: "فروشگاه",
    icon: ShopIcon,
    items: [
      {
        id: "products",
        title: "محصولات",
        href: "/dashboard/products",
        badge: 40, // نمونه badge
      },
      {
        id: "categories",
        title: "دسته‌بندی‌ها",
        href: "/dashboard/categories",
      },
      {
        id: "brands",
        title: "برندها",
        href: "/dashboard/brands",
      },
      {
        id: "colors",
        title: "رنگ‌ها",
        href: "/dashboard/colors",
      },
      {
        id: "sizes",
        title: "سایزها",
        href: "/dashboard/sizes",
      },
    ],
  },
  {
    id: "orders-sales",
    title: "سفارشات و فروش",
    icon: PackageIcon,
    items: [
      {
        id: "orders",
        title: "سفارشات",
        href: "/dashboard/orders",
        badge: 12, // نمونه badge
      },
      {
        id: "payments",
        title: "پرداخت‌ها",
        href: "/dashboard/payments",
      },
      {
        id: "discounts",
        title: "کدهای تخفیف",
        href: "/dashboard/discounts",
      },
    ],
  },
  {
    id: "content",
    title: "محتوا",
    icon: ContentIcon,
    items: [
      {
        id: "blogs",
        title: "بلاگ‌ها",
        href: "/dashboard/blogs",
        badge: 5, // نمونه badge
      },
      {
        id: "tutorials",
        title: "آموزش",
        href: "/dashboard/tutorials",
      },
      {
        id: "banners",
        title: "بنرها",
        href: "/dashboard/banners",
      },
    ],
  },
  {
    id: "users",
    title: "کاربران",
    icon: UserIcon,
    items: [
      {
        id: "users-list",
        title: "کاربران",
        href: "/dashboard/users",
      },
      {
        id: "comments",
        title: "کامنت‌ها",
        href: "/dashboard/comments",
        badge: 8, // نمونه badge
      },
    ],
  },
  {
    id: "settings",
    title: "تنظیمات",
    icon: SettingIcon,
    items: [
      {
        id: "financial-info",
        title: "اطلاعات مالی",
        href: "/dashboard/settings/financial",
      },
      {
        id: "personal-info",
        title: "اطلاعات فردی",
        href: "/dashboard/settings/personal",
      },
      {
        id: "store-info",
        title: "اطلاعات فروشگاهی",
        href: "/dashboard/settings/store",
      },
    ],
  },
];

export const SIDEBAR_BOTTOM_ACTIONS: SidebarItem[] = [
  {
    id: "go-to-shop",
    title: "انتقال به فروشگاه",
    icon: CartIcon,
    href: "/shop",
  },
  {
    id: "profile",
    title: "انتقال به صفحه پروفایل",
    icon: UserProfileIcon,
    href: "/profile",
  },
  {
    id: "logout",
    title: "خروج از حساب کاربری",
    icon: ExitIcon,
    href: "/logout",
  },
];