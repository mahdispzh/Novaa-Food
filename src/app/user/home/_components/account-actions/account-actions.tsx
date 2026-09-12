import { ICONS } from "@/src/shared/constants/dynamic-icon";

export function AccountActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 border-1 border-gray-300 bg-white px-4 py-4">
      <button className="flex w-full items-center gap-2 py-3 text-md" type="button">
        <ICONS.exitIcon color="text-secondary" size="lg" />
        خروج از حساب کاربری
      </button>
      <button className="flex w-full items-center gap-2 py-3 text-md" type="button">
        <ICONS.deleteIcon color="text-secondary" size="lg" />
        پاک کردن حساب کاربری
      </button>
    </div>
  );
}
