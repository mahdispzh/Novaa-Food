"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { brandsApiPost } from "@/src/app/dashboard/categories/components/new items/modal-add-brand/services/brands-api-post";
import { CloseIcon } from "@/src/shared/constants/icons";
import { Modal, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";

/* ---------------- Zod Schema ---------------- */
const brandSchema = z.object({
  name: z.string().min(1, "نام برند الزامی است"),
});

type BrandFormValues = z.infer<typeof brandSchema>;

interface Props {
  onClose: () => void;
}

export function ModalAddBrand({ onClose }: Props) {
  const methods = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, reset, control } = methods;

  const onSubmit = async (data: BrandFormValues) => {
    try {
      const result = await brandsApiPost({
        name: data.name,
        slug: data.name,
        logoUrl: "",
      });

      /* console.log("result", result)
       console.log("token" ,localStorage.getItem("token"));*/

      reset();
      onClose();
    } catch (err) {
      console.error(err);
      // console.log("token" ,localStorage.getItem("token"));
    }
  };
  // console.log("token" ,localStorage.getItem("token"));

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="w-[452px] rounded-sm bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray px-4 py-2">
          <Text text="ایجاد برند" size="lg" weight="bold" />

          <button type="button" onClick={onClose} className={"cursor-pointer"}>
            <CloseIcon size="sm" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 px-8 py-6">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <CustomInputRHF name="name" label="نام برند" control={control} />

              <button
                type="submit"
                className="w-full rounded-sm bg-danger py-2 text-white"
              >
                تایید
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
}
