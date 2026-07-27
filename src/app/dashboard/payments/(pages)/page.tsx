// page.tsx
"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";

import { LineChartDots } from "@/src/shared/ui";
import { DashboardSidebarStats } from "../_components/dashboard-sidebar-stats.ui";
import { TransactionsTable } from "../_components/transactions-table";
import { usePaymentsDashboard } from "../_hooks/usePayments";

export default function DashboardPayments() {
  const { data, isLoading } = usePaymentsDashboard();

  return (
    <DashboardContainer>
      <DashboardSidebar>
        <DashboardSidebarStats />
      </DashboardSidebar>

      <DashboardMain>
        <div className="flex h-auto w-full flex-col gap-5 pt-16">
          <LineChartDots
            data={data} // مستقیماً داده‌ها را پاس می‌دهیم
            isLoading={isLoading}
            title="وضعیت پرداخت"
            showLegend={true}
            height={320}
            className="mb-4"
          />
          <TransactionsTable />
        </div>
      </DashboardMain>
    </DashboardContainer>
  );
}
