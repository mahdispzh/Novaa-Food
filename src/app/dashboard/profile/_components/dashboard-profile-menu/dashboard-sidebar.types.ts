import type { ElementType } from "react";

export type DashboardSidebarItemId =
  | "owner"
  | "store"
  | "finance"
  | "comments"
  | "exit";

export type DashboardSidebarItem = {
  id: DashboardSidebarItemId;
  label: string;
  icon: ElementType;
  href: string;
};
