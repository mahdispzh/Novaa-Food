"use client";

import { colorApiPost } from "@/src/app/dashboard/categories/components/new items/modaladdcolors/services/color-api-post";
import { CloseIcon } from "@/src/shared/constants/icons";
import { Modal, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

/* ---------------- Zod Schema ---------------- */
const colorSchema = z.object({
  name: z.string().min(1, "نام رنگ الزامی است"),
  hexCode: z.string().min(7, "کد رنگ با # الزامی است"),
});

type ColorFormValues = z.infer<typeof colorSchema>;

interface Props {
  mode?: "create" | "update";
  onClose: () => void;
}

export function ModalAddColor({ onClose }: Props) {
  const methods = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      hexCode: "",
    },
  });
  const { handleSubmit, reset, control } = methods;
  const onSubmit = async (data: ColorFormValues) => {
    try {
      const result = await colorApiPost({
        name: data.name,
        hexCode: data.hexCode,
      });

      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
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
              <CustomInputRHF name="name" label="نام زنگ" control={control} />
              <CustomInputRHF name="hexCode" label="کد زنگ" control={control} />

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
