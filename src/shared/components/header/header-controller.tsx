"use client";

import { usePathname } from "next/navigation";
import { BaseHeader } from "@/src/shared/components/header/base-header";

export default function HeaderController() {
  const pathname = usePathname();
  const hideHeaderOnBloggerDetails = /^\/bloggers\/[^^/]+$/.test(pathname);

  if (hideHeaderOnBloggerDetails) {
    return null;
  }

  return <BaseHeader />;
}
