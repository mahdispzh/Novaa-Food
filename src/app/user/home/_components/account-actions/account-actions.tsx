import { ICONS } from "@/src/shared/constants/dynamic-icon";

export function AccountActions() {
  return (
    <div className="mt-auto border-t border-[#e5e0dc] px-4 py-4">
      <button className="flex w-full items-center gap-2 py-2 text-sm" type="button">
        <ICONS.arrowRightIcon color="text-[#3d332f]" size="md" />
        خروج از حساب کاربری
      </button>
      <button className="flex w-full items-center gap-2 py-2 text-sm" type="button">
        <span className="text-base">♧</span>
        پاک کردن حساب کاربری
      </button>
    </div>
  );
}
