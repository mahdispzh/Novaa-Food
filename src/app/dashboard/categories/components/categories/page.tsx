/**
 * create-category-button.tsx
 * ---------------------------------------------
 * فقط مسئول باز کردن modal در حالت create است
 * هیچ logic دیگری (api / form / query) اینجا نیست
 */

"use client";

import { useState } from "react";
import {CategoryModal} from "@/src/app/dashboard/categories/components/categories/components/category-modal";

export default function CreateCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded-sm"
      >
        افزودن دسته‌بندی
      </button>

      {open && (
        <CategoryModal
          mode="create"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
