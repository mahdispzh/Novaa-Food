import { ICONS } from "@/src/shared/constants/dynamic-icon";

export function CommentsCard() {
  return (
    <button
      className="mt-4 flex min-h-16 w-full flex-col items-start justify-center gap-1 rounded-md border border-[#d8d0c2] bg-[#f5f0e7] px-4 text-right"
      type="button"
    >
      <span className="flex w-full items-center justify-between text-sm font-medium">
        دیدگاه‌های من
        <ICONS.messageIcon color="text-[#3d332f]" size="md" />
      </span>
      <span className="text-[10px] text-[#817873]">
        اینجا می‌توانید دیدگاه‌های ثبت‌شده خود را مشاهده و مدیریت کنید.
      </span>
    </button>
  );
}
