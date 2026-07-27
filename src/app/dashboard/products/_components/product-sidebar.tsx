"use client";

import { AddProductModal } from "@/src/app/dashboard/products/_components/modal/AddProductModal";
import { DashboardPlusIcon } from "@/src/shared/constants/icons/dashboard-plus-icon";
import { Text } from "@/src/shared/ui";
import { useState } from "react";

export const ProductSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="gap-layout flex flex-col">
        <div className="flex items-center justify-between rounded-sm bg-pure-white py-2 pr-4 pl-2 shadow-xl">
          <Text text="اضافه کردن محصول" size="lg" weight="bold" />

          <div
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm bg-primary shadow-xl"
            onClick={() => setOpen(true)}
          >
            <DashboardPlusIcon size="xl" />
          </div>
        </div>
      </div>

      {open && (
        <AddProductModal
          isOpen={open}
          mode="create"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
