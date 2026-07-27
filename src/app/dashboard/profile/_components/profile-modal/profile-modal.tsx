"use client";

import { PROFILE_MODAL_CONFIG } from "@/src/app/dashboard/profile/_constants/profile-modal.constants";
import type { ProfileModalType } from "@/src/app/dashboard/profile/_types/profile-modal.types";
import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { Modal, Text } from "@/src/shared/ui";
import { CustomInput } from "@/src/shared/ui/custom-input/custom-input-ui";
import { useState } from "react";

interface Props {
  modalType: ProfileModalType | null;
  onClose: () => void;
}

export function ProfileModal({ modalType, onClose }: Props) {
  if (!modalType) return null;

  const config = PROFILE_MODAL_CONFIG[modalType];

  // ✅ ایجاد state برای نگهداری مقادیر فیلدها
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    config.fields.forEach((field) => {
      initial[field.name] = field.value || "";
    });
    return initial;
  });

  const handleFieldChange = (name: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen onClose={onClose}>
      <div className="rounded-sm bg-white" style={{ width: "452px" }}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-gray px-4 py-2">
            <Text text={config.title} size="lg" weight="bold" />
            <button type="button" onClick={onClose} className="cursor-pointer">
              <CloseIcon size="sm" />
            </button>
          </div>

          <div className="flex flex-col gap-4 px-8 py-6">
            <div className="flex flex-col gap-4">
              {config.fields.map((field) => (
                <CustomInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={fieldValues[field.name] || ""}
                  onChange={(value) => handleFieldChange(field.name, value)}
                />
              ))}
            </div>

            <button className="w-full rounded-sm bg-danger py-2 text-white">
              تایید
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
