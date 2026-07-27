import { AddList } from "@/src/app/dashboard/categories/components/add_list";
import { CategorySidebar } from "@/src/app/dashboard/categories/components/category-sidebar";
import { CategoryTab } from "@/src/app/dashboard/categories/components/category-tab";
import Main from "@/src/app/dashboard/categories/components/main";
import { ProductStatusCard } from "@/src/app/dashboard/products/_components/product-status-card";
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
            <CategorySidebar />
            <AddList />
          </div>
          <ProductStatusCard />
        </div>
      </DashboardSidebar>

      <DashboardMain>
        <CategoryTab />
        <Main />
      </DashboardMain>
    </DashboardContainer>
  );
}
