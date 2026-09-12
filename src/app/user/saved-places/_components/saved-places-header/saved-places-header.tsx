import { ICONS } from "@/src/shared/constants/dynamic-icon";

interface SavedPlacesHeaderProps {
  title: string;
}

export function SavedPlacesHeader({ title }: SavedPlacesHeaderProps) {
  return (
    <header className="flex items-center justify-start gap-2 py-2">
      <button
        aria-label="بازگشت"
        className="flex h-8 w-9 items-center justify-center"
        type="button"
      >
        <ICONS.arrowRightIcon color="text-secondary" size="lg" />
      </button>
      <h1 className="text-base font-bold">{title}</h1>
    </header>
  );
}