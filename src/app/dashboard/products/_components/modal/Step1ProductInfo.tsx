"use client";

import { getBrands } from "@/src/app/dashboard/products/_services/brand-api";
import { getCategories } from "@/src/app/dashboard/products/_services/category-api";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { SelectRHF } from "@/src/shared/ui/extar-components/form-filds/custom-select";
import { TextareaRHF } from "@/src/shared/ui/extar-components/form-filds/custom-textarea";
import { useQuery } from "@tanstack/react-query";
import { Control } from "react-hook-form";
import { ProductFormValues } from "../../_types/product.types";

export function Step1ProductInfo({
  control,
}: {
  control: Control<ProductFormValues>;
}) {
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const categoryOptions =
    categoriesData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? [];

  const brandOptions =
    brandsData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? [];

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <CustomInputRHF control={control} name="name" label="نام محصول" />
        <SelectRHF
          control={control}
          name="category_id"
          label="دسته بندی"
          options={categoryOptions}
        />
        <SelectRHF
          control={control}
          name="brand_id"
          label="برند"
          options={brandOptions}
        />
      </div>
      <TextareaRHF
        control={control}
        name="description"
        label="توضیحات"
        rows={5}
      />
    </>
  );
}
