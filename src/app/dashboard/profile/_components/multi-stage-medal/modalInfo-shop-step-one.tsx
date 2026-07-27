import { Caption, Modal, Text, Textarea } from "@/src/shared/ui";
import { CustomInput } from "@/src/shared/ui/custom-input/custom-input-ui";

interface Props {
  onClose: () => void;
  onNext: () => void;
  data: any;
  updateData: (v: any) => void;
}

export default function ModalInfoShopStepOne({
  onClose,
  onNext,
  data,
  updateData,
}: Props) {
  return (
    <Modal isOpen={true} onClose={() => {}}>
      <div className="rounded-sm bg-white" style={{ width: "565px" }}>
        <div className="flex justify-between border-b-2 border-gray px-4 py-2">
          <div className="flex flex-col gap-2">
            <Text text="ویرایش اطلاعات" size="lg" weight="bold" />
            <Caption
              text="برای ویرایش اطلاعات لطفا فیلدها را تکمیل کنید."
              color="secondary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <CustomInput
            name="shopName"
            label="نام فروشگاه"
            value={data.shopName || ""}
            onChange={(v) => updateData({ shopName: v })}
          />

          <Textarea
            rows={6}
            value={data.description}
            onChange={(value) => updateData({ description: value })} // ← اصلاح شد
          />

          <div className="flex gap-2">
            <button
              onClick={onNext}
              className="w-full rounded-sm bg-danger py-2 text-white"
            >
              مرحله ی بعد
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-sm border border-danger py-2 text-danger"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
