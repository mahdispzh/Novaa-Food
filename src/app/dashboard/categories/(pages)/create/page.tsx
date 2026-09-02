// "use client";

// import { DefaultButton, Text } from "@/src/shared/ui";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { CategoryParentSelector } from "../../_components/category-parent-selector.ui";
// import { createCategory, getCategories } from "../../_services/categories.api";

// type CategoryFormValues = {
//   name: string;
//   slug: string;
//   description: string;
//   parent_id: number | null;
// };

// export default function CreateCategoryPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const methods = useForm<CategoryFormValues>({
//     defaultValues: {
//       name: "",
//       slug: "",
//       description: "",
//       parent_id: null,
//     },
//   });

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = methods;

//   const nameValue = watch("name");
//   const parentIdValue = watch("parent_id");

//   const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
//     queryKey: ["categories", "all-for-parent-select"],
//     queryFn: () => getCategories(1, 100),
//   });

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setValue("name", value);
//     const autoSlug = value.trim().replace(/\s+/g, "-").toLowerCase();
//     setValue("slug", autoSlug);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImageFile(file);
//     if (file) {
//       setPreviewUrl(URL.createObjectURL(file));
//     } else {
//       setPreviewUrl(null);
//     }
//   };

//   const onSubmit = async (values: CategoryFormValues) => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name.trim());
//       formData.append("slug", values.slug.trim());
//       formData.append("description", values.description.trim());
//       if (values.parent_id) {
//         formData.append("parentId", String(values.parent_id));
//       }
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const result = await createCategory(formData);
//       console.log("✅ دسته‌بندی ایجاد شد:", result);
//       router.push("/dashboard/categories");
//     } catch (error: any) {
//       console.error("❌ خطا در ایجاد دسته‌بندی:", error);
//       alert(error?.message || "خطا در ایجاد دسته‌بندی");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex h-auto w-full flex-col gap-6 rounded-xs bg-accent p-6"
//       >
//         {/* عکس دسته‌بندی */}
//         <div>
//           <Text text="عکس دسته‌بندی" size="md" weight="medium" />
//           <div className="mt-1 flex items-center gap-3">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-gray bg-gray-50">
//               {previewUrl ? (
//                 <img
//                   src={previewUrl}
//                   alt="پیش‌نمایش تصویر"
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <Text text="بدون عکس" size="sm" color="gray" />
//               )}
//             </div>

//             <label className="flex flex-1 cursor-pointer items-center justify-center rounded-sm border border-dashed border-gray px-3 py-3 text-center text-sm text-primary transition hover:bg-gray-50">
//               <Text
//                 text={
//                   imageFile ? imageFile.name : "برای وارد کردن تصویر کلیک کنید"
//                 }
//                 size="sm"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div>
//         </div>

//         {/* نام دسته‌بندی */}
//         <div>
//           <Text text="نام دسته‌بندی" size="md" weight="medium" />
//           <input
//             type="text"
//             value={nameValue}
//             onChange={handleNameChange}
//             placeholder="نام دسته‌بندی را وارد کنید"
//             className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
//           />
//           {errors.name && (
//             <Text text={`${errors.name.message}`} size="sm" color="danger" />
//           )}
//         </div>

//         {/* انتخاب دسته‌بندی والد — کامپوننت مشترک */}
//         <CategoryParentSelector
//           control={control}
//           name="parent_id"
//           categories={categoriesData?.data}
//           isLoading={isCategoriesLoading}
//           parentIdValue={parentIdValue}
//           onChangeParentId={(val) => setValue("parent_id", val)}
//         />

//         {/* توضیحات */}
//         <div>
//           <Text text="توضیحات" size="md" weight="medium" />
//           <textarea
//             {...register("description")}
//             placeholder="توضیحات دسته‌بندی را وارد کنید"
//             rows={4}
//             className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
//           />
//         </div>

//         {/* دکمه ثبت */}
//         <div className="flex justify-end pt-2">
//           <DefaultButton
//             type="primary"
//             style="fill"
//             label={isSubmitting ? "در حال ثبت..." : "افزودن دسته‌بندی"}
//             action={handleSubmit(onSubmit)}
//             disabled={isSubmitting}
//           />
//         </div>
//       </form>
//     </FormProvider>
//   );
// }
"use client";

import { DefaultButton, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { SingleImageUploader } from "@/src/shared/ui/single-image-uploader/single-image-uploader.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CategoryParentSelector } from "../../_components/category-parent-selector.ui";
import { createCategory, getCategories } from "../../_services/categories.api";

const categorySchema = z.object({
  name: z.string().trim().min(1, "نام دسته‌بندی الزامی است"),
  slug: z.string().trim().min(1, "اسلاگ الزامی است"),
  description: z.string().trim().optional().default(""),
  parent_id: z.number().nullable(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CreateCategoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      parent_id: null,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const nameValue = watch("name");
  const parentIdValue = watch("parent_id");

  // اسلاگ خودکار از روی نام
  useEffect(() => {
    const autoSlug = nameValue.trim().replace(/\s+/g, "-").toLowerCase();
    setValue("slug", autoSlug, { shouldValidate: true });
  }, [nameValue, setValue]);

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories", "all-for-parent-select"],
    queryFn: () => getCategories(1, 100),
  });

  const onSubmit = async (values: CategoryFormValues) => {
    if (!imageFile) {
      setImageError("لطفاً یک تصویر برای دسته‌بندی انتخاب کنید.");
      return;
    }
    setImageError("");

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("slug", values.slug.trim());
      formData.append("description", (values.description ?? "").trim());
      if (values.parent_id) {
        formData.append("parentId", String(values.parent_id));
      }
      formData.append("image", imageFile); // 👈 دیگه چک if نمی‌خواد چون بالا مطمئن شدیم هست

      const result = await createCategory(formData);
      console.log("✅ دسته‌بندی ایجاد شد:", result);
      router.push("/dashboard/categories");
    } catch (error: any) {
      console.error("❌ خطا در ایجاد دسته‌بندی:", error);
      alert(error?.message || "خطا در ایجاد دسته‌بندی");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-6 rounded-xs bg-accent p-6"
      >
        {/* عکس دسته‌بندی — با مدل UI برند */}
        <SingleImageUploader
          id="category-image"
          value={imageFile}
          onChange={(file) => {
            setImageFile(file);
            if (file) setImageError("");
          }}
          label="تصویر دسته‌بندی را بارگذاری کنید."
          error={imageError}
        />

        {/* نام دسته‌بندی */}
        <CustomInputRHF
          control={control}
          name="name"
          label="نام دسته‌بندی"
          placeholder="نام دسته‌بندی را وارد کنید"
          required
        />

        {/* انتخاب دسته‌بندی والد — کامپوننت مشترک */}
        <CategoryParentSelector
          control={control}
          name="parent_id"
          categories={categoriesData?.data}
          isLoading={isCategoriesLoading}
          parentIdValue={parentIdValue}
          onChangeParentId={(val) => setValue("parent_id", val)}
        />

        {/* توضیحات */}
        <div>
          <Text text="توضیحات" size="md" weight="medium" />
          <textarea
            {...register("description")}
            placeholder="توضیحات دسته‌بندی را وارد کنید"
            rows={4}
            className="text-regular mt-1 w-full rounded-sm border border-gray px-3 py-3 text-sm text-primary shadow-sm focus:border-primary focus:outline-none"
          />
        </div>

        {/* دکمه ثبت */}
        <div className="flex justify-end pt-2">
          <DefaultButton
            type="primary"
            style="fill"
            label={isSubmitting ? "در حال ثبت..." : "افزودن دسته‌بندی"}
            action={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </FormProvider>
  );
}
