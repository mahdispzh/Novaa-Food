"use client";

import { usePathname } from "next/navigation";
import { BaseHeader } from "@/src/shared/components/header/base-header";

export default function HeaderController() {
  const pathname = usePathname();
  const hideHeaderOnBloggerDetails = /^\/bloggers\/[^^/]+$/.test(pathname);
  const hideOnTestIconPage = pathname === "/test-icon" || pathname.startsWith("/test-icon/");
  const hideOnTestPage = pathname === "/test" || pathname.startsWith("/test/");

  if (hideHeaderOnBloggerDetails || hideOnTestPage || hideOnTestIconPage) {
    return null;
  }

  return <BaseHeader />;
}
