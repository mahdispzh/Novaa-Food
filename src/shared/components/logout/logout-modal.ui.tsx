// src/shared/components/logout/logout-modal.ui.tsx
"use client";

import texts from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, Modal, Text } from "@/src/shared/ui";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  console.log("LogoutModal رندر شد، isOpen:", isOpen);

  const handleConfirm = () => {
    console.log("✅ دکمه خروج کلیک شد!");
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          width: "586px",
          maxWidth: "586px",
          minWidth: "586px",
          height: "219px",
        }}
        className="flex flex-col overflow-hidden rounded-xs bg-white shadow-xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray p-5">
          <Text
            text={texts.logout.title}
            size="md"
            weight="medium"
            color="primary"
          />
          <div className="cursor-pointer" onClick={onClose}>
          </div>
        </div>

        <div className="flex overflow-y-auto p-4">
          <Text
            text={texts.logout.description}
            size="sm"
            weight="regular"
            color="primary"
          />
        </div>

        <div className="flex shrink-0 items-start justify-end gap-2 border-gray p-3">
          <DefaultButton
            type="primary"
            style="outline"
            label={texts.logout.cancelLabel}
            action={onClose}
          />
          <DefaultButton
            type="primary"
            style="fill"
            label={texts.logout.confirmLabel}
            action={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};
