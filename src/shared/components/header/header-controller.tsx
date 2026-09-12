"use client";

import { usePathname } from "next/navigation";
import { BaseHeader } from "@/src/shared/components/header/base-header";

export default function HeaderController() {
  const pathname = usePathname();
  const hideHeaderOnBloggerDetails = /^\/bloggers\/[^^/]+$/.test(pathname);
  const hideOnTestIconPage = pathname === "/test-icon" || pathname.startsWith("/test-icon/");
  const hideOnMapPage = pathname === "/map" || pathname.startsWith("/map/")
  const hideOnTestPage = pathname === "/test" || pathname.startsWith("/test/");
  const hideOnUserPages = pathname === "/user" || pathname.startsWith("/user/");
  const hideOnAuthPages =
    pathname.startsWith("/send-otp") || pathname.startsWith("/verify-otp");

  if (
    hideHeaderOnBloggerDetails ||
    hideOnTestPage ||
    hideOnTestIconPage ||
    hideOnUserPages ||
    hideOnAuthPages ||
    hideOnMapPage
  ) {
    return null;
  }

  return <BaseHeader />;
}
