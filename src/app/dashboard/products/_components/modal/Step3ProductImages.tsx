"use client";

import { ImageUploaderRHF } from "@/src/shared/ui/extar-components/form-filds/custom-image-uploader/image-uploader-rhf";
import { Control } from "react-hook-form";
import { ProductFormValues } from "../../_types/product.types";

export function Step3ProductImages({
  control,
}: {
  control: Control<ProductFormValues>;
}) {
  return <ImageUploaderRHF control={control} name="images" maxImages={10} />;
}
