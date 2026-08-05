import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Link from "next/link";

export function BaseHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-secondary)] bg-[var(--color-white)]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            aria-label="پشتیبانی"
            className="flex h-11 w-11 items-center justify-center bg-[var(--color-white)] text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-light-beige)]"
            type="button"
          >
            <ICONS.headsetIcon color="text-current" size="2xl" />
          </button>

          <button
            aria-label="پروفایل"
            className="flex h-11 w-11 items-center justify-center bg-[var(--color-white)] text-[var(--color-primary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-light-beige)]"
            type="button"
          >
            <ICONS.profileIcon color="text-current" size="2xl" />
          </button>
        </div>

        <Link className="flex items-center gap-3 text-[var(--color-primary)]" href="/">
          <ICONS.logoIcon color="text-[var(--color-primary)]" size="5xl" />
        </Link>
      </div>
    </header>
  );
}