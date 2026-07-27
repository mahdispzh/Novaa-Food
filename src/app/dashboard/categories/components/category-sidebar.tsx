"use client";

import { useState } from "react";
import { DashboardPlusIcon } from "@/src/shared/constants/icons/dashboard-plus-icon";
import { Text } from "@/src/shared/ui";
import {CategoryModal} from "@/src/app/dashboard/categories/components/categories/components/category-modal";

export const CategorySidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="gap-layout flex flex-col ">
        <div className="flex justify-between items-center rounded-xs border-2 border-accent px-4 py-2">
          <Text text="اضافه کردن دسته بندی" size="lg" weight="bold" />

          <button onClick={() => setOpen(true)} className={"cursor-pointer"}>
            <DashboardPlusIcon size="xl" />
          </button>
        </div>
      </div>

      {open && (
        <CategoryModal
          mode="create"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
