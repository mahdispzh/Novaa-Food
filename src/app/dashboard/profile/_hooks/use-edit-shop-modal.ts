"use client";

import { useState } from "react";

type Step = 1 | 2;

interface ShopFormData {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  image?: File | null;
}

const initialData: ShopFormData = {
  name: "",
  description: "",
  phone: "",
  email: "",
  address: "",
  image: null,
};

export function useEditShopModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<ShopFormData>(initialData);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setData(initialData);
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const updateData = (values: Partial<ShopFormData>) => {
    setData((prev) => ({ ...prev, ...values }));
  };

  return {
    isOpen,
    step,
    data,
    openModal,
    closeModal,
    nextStep,
    prevStep,
    updateData,
  };
}
