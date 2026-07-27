"use client";

import { CloseModalIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { FormStepper } from "@/src/shared/ui/form-stepper/form-stepper.ui";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider } from "react-hook-form";
import { PRODUCT_STEPS } from "../../_constants/products.constants";
import { useAddProductForm } from "../../_hooks/useAddProductForm";
import { useAddProductWizard } from "../../_hooks/useAddProductWizard";
import { useCreateProduct } from "../../_hooks/useCreateProduct";
import { ProductFormValues } from "../../_types/product.types";
import { ConfirmCloseModal } from "../components/components/confirm-close-modal";
import { useProduct } from "../components/hook/useProduct";
import { useUpdateProduct } from "../components/hook/useUpdateProduct";
import { AddProductFooter } from "./AddProductFooter";
import { Step1ProductInfo } from "./Step1ProductInfo";
import { Step2ProductDetails } from "./Step2ProductDetails";
import { Step3ProductImages } from "./Step3ProductImages";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  productSlug?: string;
};

export function AddProductModal({ isOpen, onClose, mode, productSlug }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const methods = useAddProductForm();
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;
  const { step, next, prev } = useAddProductWizard(methods);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const [confirmClose, setConfirmClose] = useState(false);

  const { data: product, isLoading } = useProduct(
    mode === "update" ? productSlug : undefined,
  );

  useEffect(() => {
    if (mode === "update" && product) {
      reset({
        name: product.data.name,
        description: product.data.description,
        category_id: product.data.category_id,
        brand_id: product.data.brand_id,
        images: product.data.images ?? [],
        product_variants:
          product.data.product_variants?.map((v) => ({
            id: v.id, // ⚠️ مهم: id رو هم نگه دار
            color_id: v.color_id,
            size_id: v.size_id,
            price: v.price,
            stock: v.stock,
            sku: v.sku,
          })) ?? [],
      });
    }
  }, [mode, product, reset]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleClose = () => {
    setConfirmClose(false);
    reset();
    onClose();
  };

  const requestClose = () => {
    if (isDirty) {
      setConfirmClose(true);
      return;
    }
    handleClose();
  };

  const cancelClose = () => {
    setConfirmClose(false);
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category_id", String(data.category_id));
      formData.append("brand_id", String(data.brand_id));

      const slug = data.name.toLowerCase().replace(/\s+/g, "-");
      formData.append("slug", slug);
      formData.append("status", "1");

      // ✅ ارسال id واریانت‌ها (برای ویرایش)
      const variants = data.product_variants.map((v, index) => ({
        ...(v.id ? { id: v.id } : {}),
        color_id: v.color_id,
        size_id: v.size_id,
        price: v.price,
        stock: v.stock,
        sku:
          v.sku ||
          `PROD-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
      }));
      formData.append("product_variants", JSON.stringify(variants));

      if (data.images && data.images.length > 0) {
        data.images.forEach((image: any) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      if (mode === "create") {
        await createMutation.mutateAsync(formData);
      } else if (mode === "update" && productSlug) {
        await updateMutation.mutateAsync({ slug: productSlug, data: formData });
      }

      handleClose();
    } catch (error) {
      console.error("PRODUCT SUBMIT ERROR:", error);
    }
  };

  // ❌ اگر مودال بسته است یا هنوز در مرورگر رندر نشده، هیچی نشون نده
  if (!isOpen || !mounted) return null;

  if (isLoading && mode === "update") {
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-[565px] rounded-sm bg-white p-6 text-center">
          <Text text="در حال بارگذاری..." size="lg" color="gray" />
        </div>
      </div>,
      document.body,
    );
  }

  // ✅ رندر اصلی با پورتال
  return (
    <>
      {createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={requestClose}
        >
          <div
            className="w-[565px] rounded-sm bg-white"
            onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک روی مودال
          >
            <div className="flex flex-row items-center justify-between gap-2 border-b-2 border-gray px-6 pt-6 pb-8">
              <Text
                text={mode === "create" ? "اضافه کردن محصول" : "ویرایش محصول"}
                size="md"
                weight="bold"
              />
              <FormStepper
                steps={PRODUCT_STEPS}
                currentStep={PRODUCT_STEPS[step]?.id ?? 1}
              />
              <button onClick={requestClose} className="cursor-pointer">
                <CloseModalIcon size="sm" />
              </button>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 p-6"
              >
                {step === 0 && <Step1ProductInfo control={methods.control} />}
                {step === 1 && (
                  <Step2ProductDetails control={methods.control} />
                )}
                {step === 2 && <Step3ProductImages control={methods.control} />}
                <AddProductFooter
                  step={step}
                  onPrev={prev}
                  onNext={next}
                  onClose={requestClose}
                  isLoading={isPending}
                />
              </form>
            </FormProvider>
          </div>
        </div>,
        document.body,
      )}

      {/* ✅ مودال تایید خروج هم با پورتال */}
      {confirmClose && (
        <ConfirmCloseModal onCancel={cancelClose} onConfirm={handleClose} />
      )}
    </>
  );
}
