"use client";

import { useAuthStore } from "@/src/shared/store/store";
import { useEffect } from "react";

export function PublicAuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.isHydrated);

  useEffect(() => {
    if (!hydrated) return;

    if (token && user) {
      window.location.replace(user.role === 2 ? "/dashboard/home" : "/profile/home");
    }
  }, [hydrated, token, user]);

  // منتظر هیدریت شدن
  if (!hydrated) {
    return null;
  }

  // اگر لاگین است چیزی رندر نکن
  if (token && user) {
    return null;
  }

  return <>{children}</>;
}
