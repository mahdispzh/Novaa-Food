import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { WalletIcon } from "@/src/shared/constants/icons/wallet-icon";
import { DashboardProfileSidebar } from "../../profile/_components/dashboard-profile-menu/dashboard-profile-sidebar";
import { FinancialInformation } from "../../profile/_components/financial-information";
import { ProfileTitle } from "../../profile/_components/profile-title";

export default function Page() {
  return (
    <DashboardContainer>
      <DashboardProfileSidebar />

      <DashboardMain>
        <ProfileTitle title="اطلاعات مالی" icon={WalletIcon} />

        <FinancialInformation />
      </DashboardMain>
    </DashboardContainer>
  );
}
