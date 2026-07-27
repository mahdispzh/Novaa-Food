"use client";
// اصلاعات مالک
import { InfoGridItem } from "@/src/app/dashboard/profile/_components/info-grid-item";
import { ProfileModal } from "@/src/app/dashboard/profile/_components/profile-modal/profile-modal";
import { useProfileModal } from "@/src/app/dashboard/profile/_hooks/use-profile-modal";

export function FinancialInformation() {
  const { activeModal, openModal, closeModal } = useProfileModal();
  return (
    <>
      <div className={"menu-item-padding menu-item-border grid grid-cols-2"}>
        <InfoGridItem
          onEdit={() => openModal("accountHolderName")}
          label={"نام صاحب حساب"}
          value={"ریحانه شاه محمدی"}
          status={"pending"}
          borderClassName={
            "border-2 border-t-0 border-r-0 border-l-0 border-gray"
          }
        />
        <InfoGridItem
          onEdit={() => openModal("bankName")}
          label={"بانک"}
          value={"سامان"}
          status={"approved"}
          borderClassName={"border-2 border-t-0 border-l-0 border-gray"}
        />
        <InfoGridItem
          onEdit={() => openModal("iban")}
          label={"شماره شبا"}
          value={"۶۵۷۰۰۹۰۰۹۸۰۰۹۸۰۰۹۸۸۷۱۱"}
          status={"rejected"}
          borderClassName={
            "border-2 border-t-0 border-r-0 border-b-0 border-l-0 border-gray"
          }
        />
        <InfoGridItem
          onEdit={() => openModal("bankAccountNumber")}
          label={"شماره حساب"}
          value={"۷۰۹۸۸۷۱۱"}
          status={"approved"}
          borderClassName={
            "border-2 border-t-0 border-b-0 border-l-0 border-gray"
          }
        />
      </div>
      <ProfileModal modalType={activeModal} onClose={closeModal} />
    </>
  );
}
