"use client";

import { NavbarDashboard } from "@/src/shared/components/navbar-dashboard/navbar-dashboard.ui";
import { AdminGuard } from "@/src/shared/providers/admin-provider";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // اگر مسیر شامل invoice باشد، نوبار را نشان نده
  const isInvoicePage = pathname?.includes("/invoice");

  return (
    <AdminGuard>
      {!isInvoicePage && <NavbarDashboard />}
      {children}
    </AdminGuard>
  );
}