import { ProductSidebar } from "@/src/app/dashboard/products/_components/product-sidebar";
import { ProductStatusCard } from "@/src/app/dashboard/products/_components/product-status-card";
import { ProductTab } from "@/src/app/dashboard/products/_components/product-tab";
import { ProductTable } from "@/src/app/dashboard/products/_components/product-table";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";

interface Props {}

export default function Page({}: Props) {
  return (
    <DashboardContainer>
      <DashboardSidebar>
        <div
          className={"gap-layout flex flex-col"}
          style={{ marginTop: "68px" }}
        >
          <div className={"flex flex-col gap-5"}>
            <ProductSidebar />
          </div>
          <ProductStatusCard />
        </div>
      </DashboardSidebar>

      <DashboardMain>
        <ProductTab />
        <ProductTable />
      </DashboardMain>
    </DashboardContainer>
  );
}
