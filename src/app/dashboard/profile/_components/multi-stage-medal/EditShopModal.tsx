"use client";

import ModalInfoShopStepOne from "@/src/app/dashboard/profile/_components/multi-stage-medal/modalInfo-shop-step-one";
import ModalInfoShopStepTwo from "@/src/app/dashboard/profile/_components/multi-stage-medal/modalInfo-shop-step-two";

interface Props {
  isOpen: boolean;
  step: 1 | 2;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  data: any;
  updateData: (v: any) => void;
}

export default function EditShopModal({
  isOpen,
  step,
  onClose,
  onNext,
  onBack,
  data,
  updateData,
}: Props) {
  if (!isOpen) return null;

  return (
    <>
      {step === 1 && (
        <ModalInfoShopStepOne
          onClose={onClose}
          onNext={onNext}
          data={data}
          updateData={updateData}
        />
      )}

      {step === 2 && (
        <ModalInfoShopStepTwo
          onClose={onClose}
          onBack={onBack}
          data={data}
          updateData={updateData}
        />
      )}
    </>
  );
}
