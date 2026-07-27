import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductFormValues } from "../_types/product.types";

const addProductSchema = z.object({
  name: z.string().min(1, "نام محصول ضروری است"),
  description: z.string().min(1, "توضیحات ضروری است"),
  category_id: z.number().min(1, "دسته‌بندی ضروری است"),
  brand_id: z.number().min(1, "برند ضروری است"),
  product_variants: z
    .array(
      z.object({
        id: z.number().optional(), // ✅ این خط اضافه شد — بدون این، id حذف می‌شد
        color_id: z.number().min(1, "رنگ ضروری است"),
        size_id: z.number().min(1, "سایز ضروری است"),
        price: z.number().min(0, "قیمت باید بیشتر از ۰ باشد"),
        stock: z.number().min(0, "موجودی باید بیشتر از ۰ باشد"),
        sku: z.string().optional(),
      }),
    )
    .min(1, "حداقل یک واریانت ضروری است"),
  variant_draft: z
    .object({
      id: z.number().optional(), // ✅ این هم اضافه شد — برای اینکه هنگام ویرایش id گم نشه
      color_id: z.number().default(0),
      size_id: z.number().default(0),
      price: z.number().default(0),
      stock: z.number().default(0),
      sku: z.string().optional(),
    })
    .optional(),
  images: z.array(z.any()).min(1, "حداقل یک تصویر ضروری است"),
});

export function useAddProductForm() {
  return useForm<ProductFormValues>({
    resolver: zodResolver(addProductSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      category_id: 0,
      brand_id: 0,
      images: [],
      product_variants: [],
      variant_draft: {
        color_id: 0,
        size_id: 0,
        price: 0,
        stock: 0,
        sku: "",
      },
    },
  });
}
