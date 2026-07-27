"use client";

import { useRouter } from "next/navigation";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
import { Subtitle } from "@/src/shared/ui";
import { AllTransactionsTable } from "../../_components/all-transactions-table";
import { DashboardSidebarStats } from "../../_components/dashboard-sidebar-stats.ui";

export default function AllTransactionsPage() {
  const router = useRouter();

  return (
    <DashboardContainer>
      <DashboardSidebar>
        <DashboardSidebarStats />
      </DashboardSidebar>

      <DashboardMain>
        <div className="flex h-auto w-full flex-col gap-5 pt-16">
          {/* هدر صفحه همه تراکنش‌ها */}
          
          {/* جدول همه تراکنش‌ها */}
          <AllTransactionsTable />
        </div>
      </DashboardMain>
    </DashboardContainer>
  );
}