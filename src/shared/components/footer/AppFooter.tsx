"use client";

import { usePathname } from "next/navigation";

import BaseFooter from "../footer/layout/base-footer";
import { HomeFooter } from "../footer/layout/home-footer";
import { SettingsFooter } from "../footer/layout/settings-footer";
import { EventFooter } from "../footer/layout/event-footer";
import { MapFooter } from "../footer/layout/map-footer";
import { ExploreFooter } from "../footer/layout/explore-footer";

import { ICONS } from "@/src/shared/constants/dynamic-icon";

const navItems = [
  { href: "/settings", label: "تنظیمات", center: "14.4%", style: { left: "0%", width: "19.1%" }, activeIcon: ICONS.settingsIcon },
  { href: "/events",   label: "رویداد",   center: "29.1%", style: { left: "19.1%", width: "19.7%" }, activeIcon: ICONS.eventIcon },
  { href: "/map",      label: "نقشه",     center: "49.3%", style: { left: "38.8%", width: "19.9%" }, activeIcon: ICONS.mapIcon },
  { href: "/explore",  label: "اکسپلورر", center: "68.5%", style: { left: "58.7%", width: "18.4%" }, activeIcon: ICONS.exploreIcon },
  { href: "/",     label: "خانه",     center: "85.6%", style: { left: "77.1%", width: "22.9%" }, activeIcon: ICONS.homeIcon },
];

export default function AppFooter() {
  const pathname = usePathname();

  const icon =
    pathname.startsWith("/settings") ? SettingsFooter :
    pathname.startsWith("/events")   ? EventFooter :
    pathname.startsWith("/map")      ? MapFooter :
    pathname.startsWith("/explore")  ? ExploreFooter :
    HomeFooter;

  const active =
    navItems.find((item) =>
      item.href === "/" ? pathname === "/" || pathname === "/" : pathname.startsWith(item.href),
    ) ?? navItems[navItems.length - 1];

  return (
    <BaseFooter
      icon={icon}
      label="ناوبری پایین صفحه"
      navItems={navItems}
      activeCenter={active.center}
      ActiveIcon={active.activeIcon}
    />
  );
}