import { DashboardProfileSidebar } from "@/src/app/dashboard/profile/_components/dashboard-profile-menu/dashboard-profile-sidebar";
import { OwnerInformation } from "@/src/app/dashboard/profile/_components/owner-information";
import { ProfileTitle } from "@/src/app/dashboard/profile/_components/profile-title";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { AdminIcon } from "@/src/shared/constants/icons/admin-icon";

export default function Page() {
  return (
    <DashboardContainer>
      <DashboardProfileSidebar />

      <DashboardMain>
        <ProfileTitle title="اطلاعات مالک فروشگاه" icon={AdminIcon} />

        <OwnerInformation />
      </DashboardMain>
    </DashboardContainer>
  );
}
