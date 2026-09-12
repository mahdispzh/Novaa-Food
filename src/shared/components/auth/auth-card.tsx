import { ReactNode } from "react";

// فقط ۱۲ پیکسل هم‌پوشانی، تا موج زیرش دیده بشه.
export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-3 mx-4 rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,.08)]">
      {children}
    </div>
  );
}
