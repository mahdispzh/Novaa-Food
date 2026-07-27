"use client";

import { CloseIcon } from "@/src/shared/constants/icons";
import { Modal, Text } from "@/src/shared/ui";

import { useDeleteCategory } from "@/src/app/dashboard/categories/components/categories/hook/use-delete-category";

type Props = {
  categoryId: number;
  onClose: () => void;
};

export function CategoryDeleteModal({ categoryId, onClose }: Props) {
  const deleteMutation = useDeleteCategory();

  const handleDelete = () => {
    deleteMutation.mutate(categoryId, {
      onSuccess: onClose,
    });
  };

  return (
    <Modal isOpen onClose={onClose}>
      <div className="w-[400px] rounded-sm bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <Text size="lg" text="حذف دسته‌بندی" weight="bold" />

          <button className="cursor-pointer" onClick={onClose}>
            <CloseIcon size="sm" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6">
          <p className="text-sm text-gray-500">
            آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟
          </p>

          <div className="mt-6 flex gap-3">
            <button
              className="w-full rounded-sm border border-gray-300 py-3"
              type="button"
              onClick={onClose}
            >
              لغو
            </button>

            <button
              className="w-full rounded-sm bg-danger py-3 text-white disabled:opacity-50"
              disabled={deleteMutation.isPending}
              type="button"
              onClick={handleDelete}
            >
              {deleteMutation.isPending ? "در حال حذف..." : "حذف"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
