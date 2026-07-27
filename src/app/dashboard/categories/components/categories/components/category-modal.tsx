"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Modal, Text } from "@/src/shared/ui";

import {
  CategoryFormValues,
  categorySchema,
} from "@/src/app/dashboard/categories/components/categories/schemas/category.schema";

import { useCategories } from "@/src/app/dashboard/categories/components/categories/hook/use-categories";
import { useCategory } from "@/src/app/dashboard/categories/components/categories/hook/use-category";
import { useCreateCategory } from "@/src/app/dashboard/categories/components/categories/hook/use-create-category";
import { useUpdateCategory } from "@/src/app/dashboard/categories/components/categories/hook/use-update-category";

import { SelectRHF } from "@/src/shared/ui/extar-components/form-filds/custom-select";

import { CloseIcon } from "@/src/shared/constants/icons";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { ConfirmCloseModal } from "./confirm-close-modal";

type Props = {
  mode: "create" | "update";
  categoryId?: number;
  onClose: () => void;
};

export function CategoryModal({ mode, categoryId, onClose }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const { data: category } = useCategory(
    mode === "update" ? categoryId : undefined,
  );

  const { data: categories, isLoading } = useCategories();

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image: "",
      parentId: null,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (mode === "update" && category) {
      reset({
        name: category.data.name,
        image: category.data.image ?? "",
        parentId: category.data.parent_id,
      });
    }
  }, [mode, category, reset]);

  const options =
    categories?.data?.data.map((c) => ({
      value: c.id,
      label: c.name,
    })) ?? [];

  const handleClose = () => {
    setShowConfirm(false);
    onClose();
  };

  const requestClose = () => {
    if (isDirty) {
      setShowConfirm(true);
      return;
    }
    handleClose();
  };

  const handleSubmitForm = (values: CategoryFormValues) => {
    if (mode === "create") {
      createMutation.mutate(values, {
        onSuccess: handleClose,
      });
      return;
    }

    if (mode === "update" && categoryId) {
      updateMutation.mutate(
        { id: categoryId, data: values },
        { onSuccess: handleClose },
      );
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <Modal isOpen onClose={requestClose}>
        <div className="w-[452px] rounded-sm bg-white">
          {/* header */}
          <div className="flex items-center justify-between border-b px-4 py-2">
            <Text
              text={mode === "create" ? "ایجاد دسته‌بندی" : "ویرایش دسته‌بندی"}
              size="lg"
              weight="bold"
            />

            <button onClick={requestClose} className="cursor-pointer">
              <CloseIcon size="sm" />
            </button>
          </div>

          {/* body */}
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-6 px-8 py-6"
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-4">
                <label className={"font-medium text-sm"}>اضافه کردن عکس</label>

                {/* <ImageUploaderRHF
                  // control={control}
                  name="image"
                  // mode="single"
                /> */}
              </div>

              <div className="flex w-full flex-col gap-3">
                <CustomInputRHF
                  control={control}
                  name="name"
                  label="نام دسته بندی"
                />

                <SelectRHF
                  control={control}
                  name="parentId"
                  label="دسته والد"
                  placeholder="انتخاب کنید"
                  searchable
                  clearable
                  loading={isLoading}
                  options={options}
                />
              </div>
            </div>

            {/* actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={requestClose}
                className="w-full cursor-pointer rounded-sm border border-danger py-3 text-danger"
              >
                انصراف
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer rounded-sm bg-danger py-3 text-white"
              >
                {isPending
                  ? "در حال ذخیره..."
                  : mode === "create"
                    ? "ثبت"
                    : "ویرایش"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {showConfirm && (
        <ConfirmCloseModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleClose}
        />
      )}
    </>
  );
}
