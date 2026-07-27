"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { CloseIcon } from "@/src/shared/constants/icons";
import { Modal, Text } from "@/src/shared/ui";

// import { sizeApiPost } from "@/src/app/modaladdsize/services/size-api-post";
import { sizeApiPost } from "@/src/app/dashboard/categories/components/new items/modaladdsize/services/size-api-post";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";

const schema = z.object({
  name: z.string().min(1, "سایز الزامی است"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  mode?: "create" | "update";
  onClose: () => void;
}

export function ModalAddSize({ onClose }: Props) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, reset, control } = methods;

  const onSubmit = async (form: FormValues) => {
    try {
      await sizeApiPost({
        name: form.name,
      });

      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="w-[452px] rounded-sm bg-white">
        <div className="flex items-center justify-between border-b border-gray px-4 py-2">
          <Text size="lg" text="ایجاد سایز" weight="bold" />

          <button className={"cursor-pointer"} type="button" onClick={onClose}>
            <CloseIcon size="sm" />
          </button>
        </div>

        <div className="px-8 py-6">
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CustomInputRHF control={control} label="سایز جدید" name="name" />

              <button
                className="w-full rounded-sm bg-danger py-2 text-white"
                type="submit"
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
