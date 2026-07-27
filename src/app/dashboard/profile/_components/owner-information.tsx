"use client";
// اصلاعات مالک
import { InfoGridItem } from "@/src/app/dashboard/profile/_components/info-grid-item";
import { ProfileModal } from "@/src/app/dashboard/profile/_components/profile-modal/profile-modal";
import { useProfileModal } from "@/src/app/dashboard/profile/_hooks/use-profile-modal";

export function OwnerInformation() {
  const { activeModal, openModal, closeModal } = useProfileModal();
  return (
    <>
      <div className={"menu-item-padding menu-item-border grid grid-cols-2"}>
        <InfoGridItem
          onEdit={() => openModal("fullName")}
          label={"نام و نام خانوادگی"}
          value={"ریحانه شاه محمدی"}
          status={"pending"}
          borderClassName={
            "border-2 border-t-0 border-r-0 border-l-0 border-gray"
          }
        />
        <InfoGridItem
          onEdit={() => openModal("phone")}
          label={"شماره موبایل"}
          value={"0999999999"}
          status={"approved"}
          borderClassName={"border-2 border-t-0 border-l-0 border-gray"}
        />
        <InfoGridItem
          onEdit={() => openModal("password")}
          label={"رمز عبور"}
          value={"********"}
          status={"rejected"}
          borderClassName={
            "border-2 border-t-0 border-r-0 border-b-0 border-l-0 border-gray"
          }
        />
        <InfoGridItem
          onEdit={() => openModal("email")}
          label={"ایمیل"}
          value={"reyhan.shahmohammadi@gmail.com"}
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
