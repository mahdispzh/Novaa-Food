"use client";

import { DashboardProfileSidebar } from "@/src/app/dashboard/profile/_components/dashboard-profile-menu/dashboard-profile-sidebar";
import EditShopModal from "@/src/app/dashboard/profile/_components/multi-stage-medal/EditShopModal";
import { ProfileTitle } from "@/src/app/dashboard/profile/_components/profile-title";
import { ShopInfo } from "@/src/app/dashboard/profile/_components/shop-info/shop-info";
import { useEditShopModal } from "@/src/app/dashboard/profile/_hooks/use-edit-shop-modal";
import { useShop } from "@/src/app/dashboard/profile/_hooks/use-info-shop";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { StoreIcon } from "@/src/shared/constants/icons/store-icon";

export default function Page() {
  const { shop, setShop } = useShop();

  const modal = useEditShopModal();

  return (
    <DashboardContainer>
      <DashboardProfileSidebar />

      <DashboardMain>
        <ProfileTitle title={"اطلاعات فروشگاه"} icon={StoreIcon} />

        <ShopInfo shop={shop} onEdit={modal.openModal} />

        <EditShopModal
          isOpen={modal.isOpen}
          step={modal.step}
          onClose={modal.closeModal}
          onNext={modal.nextStep}
          onBack={modal.prevStep}
          data={modal.data}
          updateData={modal.updateData}
        />
      </DashboardMain>
    </DashboardContainer>
  );
}
