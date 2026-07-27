"use client";

import Link from "next/link";

import { Text } from "@/src/shared/ui";

import {
  DASHBOARD_SIDEBAR_EXIT_ITEM,
  DASHBOARD_SIDEBAR_ITEMS,
} from "./menu-items";
import { useDashboardSidebar } from "./use-dashboard-sidebar";

export function DashboardProfileSidebar() {
  const { setActive, isActive } = useDashboardSidebar();

  const renderItem = (item: any) => {
    const Icon = item.icon;
    const active = isActive(item.id);

    return (
      <Link
        key={item.id}
        href={item.href}
        onClick={() => setActive(item.id)}
        className="flex cursor-pointer items-end gap-2 transition-colors"
      >
        <Icon size="lg" color={active ? "text-danger" : "text-primary"} />

        <Text
          text={item.label}
          size="lg"
          weight="medium"
          color={active ? "danger" : "primary"}
        />
      </Link>
    );
  };

  const ExitIcon = DASHBOARD_SIDEBAR_EXIT_ITEM.icon;
  const exitActive = isActive("exit");

  return (
    <div className="menu-item-padding menu-item-border flex h-[80vh] w-[25%] flex-col justify-between">
      {/* top items */}
      <div className="gap-layout flex flex-col">
        {DASHBOARD_SIDEBAR_ITEMS.map(renderItem)}
      </div>

      {/* exit */}
      <Link
        href={DASHBOARD_SIDEBAR_EXIT_ITEM.href}
        onClick={() => setActive("exit")}
        className="flex cursor-pointer items-end gap-2 transition-colors"
      >
        <ExitIcon
          size="lg"
          color={exitActive ? "text-danger" : "text-primary"}
        />

        <Text
          text={DASHBOARD_SIDEBAR_EXIT_ITEM.label}
          size="lg"
          weight="medium"
          color={exitActive ? "danger" : "primary"}
        />
      </Link>
    </div>
  );
}
