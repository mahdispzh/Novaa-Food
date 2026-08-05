"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import BaseFooter from "../footer/layout/base-footer";
import { EventFooter } from "../footer/layout/event-footer";
import { ExploreFooter } from "../footer/layout/explore-footer";
import { HomeFooter } from "../footer/layout/home-footer";
import { MapFooter } from "../footer/layout/map-footer";
import { SettingsFooter } from "../footer/layout/settings-footer";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

const navItems = [
  { href: "/settings", label: "تنظیمات", center: "14.4%", style: { left: "0%", width: "19.1%" }, activeIcon: ICONS.settingsIcon },
  { href: "/events",   label: "رویداد",   center: "29.1%", style: { left: "19.1%", width: "19.7%" }, activeIcon: ICONS.eventIcon },
  { href: "/map",      label: "نقشه",     center: "49.3%", style: { left: "38.8%", width: "19.9%" }, activeIcon: ICONS.mapIcon },
  { href: "/explore",  label: "اکسپلورر", center: "68.5%", style: { left: "58.7%", width: "18.4%" }, activeIcon: ICONS.exploreIcon },
  { href: "/",         label: "خانه",     center: "85.6%", style: { left: "77.1%", width: "22.9%" }, activeIcon: ICONS.homeIcon },
];

function findActive(pathname: string) {
  return (
    navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    ) ?? navItems[navItems.length - 1]
  );
}

export default function AppFooter() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(() => findActive(pathname).href);

  // keep in sync with real route changes (back/forward buttons, redirects, etc.)
  useEffect(() => {
    setActiveHref(findActive(pathname).href);
  }, [pathname]);

  const active = navItems.find((item) => item.href === activeHref) ?? navItems[navItems.length - 1];

  const icon =
    activeHref === "/settings" ? SettingsFooter :
    activeHref === "/events"   ? EventFooter :
    activeHref === "/map"      ? MapFooter :
    activeHref === "/explore"  ? ExploreFooter :
    HomeFooter;

  return (
    <BaseFooter
      ActiveIcon={active.activeIcon}
      activeCenter={active.center}
      color="text-white"
      icon={icon}
      label="ناوبری پایین صفحه"
      navItems={navItems}
      size="5xl"
      onNavItemPress={setActiveHref}
    />
  );
}