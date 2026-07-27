"use client";

import { ProfileModalType } from "@/src/app/dashboard/profile/_types/profile-modal.types";
import { useState } from "react";

export function useProfileModal() {
  const [activeModal, setActiveModal] = useState<ProfileModalType | null>(null);

  const openModal = (modal: ProfileModalType) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return {
    activeModal,
    openModal,
    closeModal,
  };
}
