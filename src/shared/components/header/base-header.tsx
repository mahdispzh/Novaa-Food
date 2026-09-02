"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BaseHeader() {
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-beige bg-light-beige">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              aria-label="پشتیبانی"
              className="flex h-11 w-11 items-center justify-center text-primary transition hover:border-primary hover:text-primary hover:bg-light-beige"
              type="button"
            >
              <ICONS.headsetIcon color="text-secondary" size="2xl" />
            </button>

            <button
              aria-label="پروفایل"
              className="flex h-11 w-11 items-center justify-center text-primary transition hover:border-primary hover:text-primary hover:bg-light-beige"
              type="button"
              onClick={() => router.push("/send-otp")}
            >
              <ICONS.userIcon color="text-secondary" size="2xl" />
            </button>
          </div>

          <Link className="flex items-center gap-3 text-primary" href="/">
            <ICONS.logoIcon color="text-primary" size="5xl" />
          </Link>
        </div>
      </header>

      <div aria-hidden="true" className="h-19 w-full" />
    </>
  );
}