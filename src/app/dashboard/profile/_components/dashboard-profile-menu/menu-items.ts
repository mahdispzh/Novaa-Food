import { AdminIcon } from "@/src/shared/constants/icons/admin-icon";
import { CommentIcon } from "@/src/shared/constants/icons/comment-icon";
import { ExitIcon } from "@/src/shared/constants/icons/exit-icon";
import { StoreIcon } from "@/src/shared/constants/icons/store-icon";
import { WalletIcon } from "@/src/shared/constants/icons/wallet-icon";

import type { DashboardSidebarItem } from "./dashboard-sidebar.types";

export const DASHBOARD_SIDEBAR_ITEMS: DashboardSidebarItem[] = [
  {
    id: "owner",
    label: "اطلاعات مالک فروشگاه",
    icon: AdminIcon,
    href: "/dashboard/profile",
  },
  {
    id: "store",
    label: "اطلاعات فروشگاه",
    icon: StoreIcon,
    href: "/dashboard/store-information",
  },
  {
    id: "finance",
    label: "اطلاعات مالی",
    icon: WalletIcon,
    href: "/dashboard/financial-information",
  },
  {
    id: "comments",
    label: "کامنت ها",
    icon: CommentIcon,
    href: "/dashboard/comments",
  },
];

export const DASHBOARD_SIDEBAR_EXIT_ITEM = {
  id: "exit",
  label: "خروج از حساب کاربری",
  icon: ExitIcon,
  href: "#",
} as const;
