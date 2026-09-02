"use client";

import { useEffect, useRef } from "react";

import { setupInterceptors } from "../../api/interceptors";
import { useAuthStore } from "../../store/store";

export function AuthBootstrap() {
  const initialized = useRef(false);
  useEffect(() => {
    setupInterceptors();
  }, []);

  useEffect(() => {
    // ⛔ جلوگیری از اجرای دوباره
    if (initialized.current) return;

    initialized.current = true;

    // Auto-login on load disabled on purpose: previously this called
    // /auth/refresh using the refreshToken cookie and silently logged the
    // user back in on every page load / dev server restart. Now the app
    // always starts logged out.
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setHydrated(true);
  }, []);

  return null;
}
