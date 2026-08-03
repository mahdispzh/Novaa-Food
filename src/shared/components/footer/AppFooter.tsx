// src/shared/components/footer/AppFooter.tsx
"use client";

import { usePathname } from "next/navigation";

import BaseFooter from "../footer/layout/base-footer";
import { HomeFooter } from "../footer/layout/home-footer";
import { SettingsFooter } from "../footer/layout/settings-footer";
import { EventFooter } from "../footer/layout/event-footer";
import { MapFooter } from "../footer/layout/map-footer";
import { ExploreFooter } from "../footer/layout/explore-footer";

const navItems = [
  { href: "/settings", label: "تنظیمات", style: { left: "0%", width: "19.1%" } },
  { href: "/events",   label: "رویداد",   style: { left: "19.1%", width: "19.7%" } },
  { href: "/map",      label: "نقشه",     style: { left: "38.8%", width: "19.9%" } },
  { href: "/explore",  label: "اکسپلورر", style: { left: "58.7%", width: "18.4%" } },
  { href: "/",         label: "خانه",     style: { left: "77.1%", width: "22.9%" } },
];

export default function AppFooter() {
  const pathname = usePathname();

  const icon =
    pathname.startsWith("/settings") ? SettingsFooter :
    pathname.startsWith("/events")   ? EventFooter :
    pathname.startsWith("/map")      ? MapFooter :
    pathname.startsWith("/explore")  ? ExploreFooter :
    HomeFooter;

  return (
    <BaseFooter
      icon={icon}
      label="ناوبری پایین صفحه"
      navItems={navItems}
    />
  );
}