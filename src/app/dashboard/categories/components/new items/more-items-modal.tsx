"use client";

import { ModalAddBrand } from "@/src/app/dashboard/categories/components/new items/modal-add-brand/moda-add-brand";
import { ModalAddColor } from "@/src/app/dashboard/categories/components/new items/modaladdcolors/moda-add-color";
import { ModalAddSize } from "@/src/app/dashboard/categories/components/new items/modaladdsize/moda-add-size";
import { BrandCartIcon } from "@/src/shared/constants/icons/brand-cart-icon";
import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { ColorIcon } from "@/src/shared/constants/icons/color-icon";
import { DashboardPlusIcon } from "@/src/shared/constants/icons/dashboard-plus-icon";
import { RulerIcon } from "@/src/shared/constants/icons/ruler-icon";
import { Caption, Modal, Text } from "@/src/shared/ui";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export function MoreItemsModal({ onClose }: Props) {
  const [openColor, setOpenColor] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  return (
    <>
      <Modal isOpen={true} onClose={onClose}>
        <div className="w-[452px] rounded-sm bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray px-4 py-2">
            <div className={"flex items-center gap-2"}>
              <DashboardPlusIcon size={"xl"} />
              <div className={"flex flex-col"}>
                <Text text="جدید" size="lg" weight="bold" />
                <Caption
                  color={"secondary"}
                  text={"یک آیتم جدید اضافه کنید"}
                  size={"xs"}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={"cursor-pointer"}
            >
              <CloseIcon size="sm" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 px-4 py-6">
            <button
              className={"cursor-pointer"}
              onClick={() => setOpenBrand(true)}
            >
              <div
                className={
                  "flex w-full items-center gap-2 rounded-sm bg-modal-item px-2 py-3"
                }
              >
                <BrandCartIcon size={"md"} />
                <Text text={"افزودن برند"} size={"md"} weight={"medium"} />
              </div>
            </button>
            <button
              className={"cursor-pointer"}
              onClick={() => setOpenSize(true)}
            >
              <div
                className={
                  "flex w-full items-center gap-2 rounded-sm bg-modal-item px-2 py-3"
                }
              >
                <RulerIcon size={"md"} />
                <Text text={"افزودن سایز"} size={"md"} weight={"medium"} />
              </div>
            </button>
            <button
              className={"cursor-pointer"}
              onClick={() => setOpenColor(true)}
            >
              <div
                className={
                  "flex w-full items-center gap-2 rounded-sm bg-modal-item px-2 py-3"
                }
              >
                <ColorIcon size={"md"} />
                <Text text={"افزودن رنگ"} size={"md"} weight={"medium"} />
              </div>
            </button>
          </div>
        </div>
      </Modal>
      {openBrand && <ModalAddBrand onClose={() => setOpenBrand(false)} />}
      {openColor && (
        <ModalAddColor mode="create" onClose={() => setOpenColor(false)} />
      )}
      {openSize && (
        <ModalAddSize mode="create" onClose={() => setOpenSize(false)} />
      )}
    </>
  );
}
