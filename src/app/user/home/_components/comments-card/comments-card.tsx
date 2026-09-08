import { ICONS } from "@/src/shared/constants/dynamic-icon";

export function CommentsCard() {
  return (
    <button
      className="mt-4 flex min-h-16 w-full flex-col items-start justify-center gap-0.5 rounded-md border border-primary bg-beige px-4 text-right"
      type="button"
    >
      <span className="flex py-2 gap-2 items-center justify-between text-md font-medium">
        <ICONS.reviewIcon color="text-secondary" size="lg" />
        دیدگاه‌های من
      </span>
      <span className="text-xs py-2 text-gray-500">
        اینجا می‌توانید دیدگاه‌های ثبت‌شده خود را مشاهده و مدیریت کنید.
      </span>
    </button>
  );
}
