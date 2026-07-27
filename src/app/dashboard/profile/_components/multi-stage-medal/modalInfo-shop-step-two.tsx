import { Caption, Modal, Text } from "@/src/shared/ui";
import { CustomInput } from "@/src/shared/ui/custom-input/custom-input-ui";
import { ImageUploader } from "@/src/shared/ui/image-uploader/image-uploader.ui";

interface Props {
  onClose: () => void;
  onBack: () => void;
  data: any;
  updateData: (v: any) => void;
}

export default function ModalInfoShopStepTwo({
  onClose,
  onBack,
  data,
  updateData,
}: Props) {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <div className="rounded-sm bg-white" style={{ width: "565px" }}>
        <div className="flex justify-between border-b-2 border-gray px-4 py-2">
          <div className={"flex flex-col gap-2"}>
            <Text size="lg" text="ویرایش اطلاعات" weight="bold" />
            <Caption
              color={"secondary"}
              text={"برای ویرایش اطلاعات لطفا فیلدها را تکمیل کنید."}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <CustomInput
            label={"شماره تماس"}
            name={"phone"}
            value={data.phone}
            onChange={() => {}}
          />
          <CustomInput
            label={"ایمیل"}
            name={"email"}
            value={data.email}
            onChange={() => {}}
          />
          <CustomInput
            label={"آدرس"}
            name={"آدرس "}
            value={data.address}
            onChange={() => {}}
          />

          <ImageUploader size="small" />

          <div className="flex gap-2">
            <button
              className={"w-full rounded-sm bg-danger py-2 text-white"}
              onClick={onClose}
            >
              {" "}
              ثبت{" "}
            </button>
            <button
              className={
                "w-full rounded-sm border border-danger py-2 text-danger"
              }
              onClick={onBack}
            >
              مرحله قبل
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
