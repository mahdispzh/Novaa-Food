"use client";

import { useState } from "react";
import type { DashboardSidebarItemId } from "./dashboard-sidebar.types";

export function useDashboardSidebar(
  defaultActive: DashboardSidebarItemId = "owner",
) {
  const [active, setActive] = useState<DashboardSidebarItemId>(defaultActive);

  const isActive = (id: DashboardSidebarItemId) => active === id;

  const handleSelect = (id: DashboardSidebarItemId) => {
    setActive(id);
  };

  return {
    active,
    setActive: handleSelect,
    isActive,
  };
}
