import { ICONS } from "@/src/shared/constants/dynamic-icon";

interface ProfileHeaderProps {
  name: string;
  username: string;
}

export function ProfileHeader({ name, username }: ProfileHeaderProps) {
  return (
    <>
      <header className="flex items-center justify-start px-4 py-2">
        <button
          aria-label="بازگشت"
          className="flex h-10 w-10 items-center justify-center"
          type="button"
        >
          <ICONS.arrowRightIcon color="text-[#3d332f]" size="lg" />
        </button>
      </header>

      <div className="px-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 flex-col gap-2">
            <h1 className="text-lg font-bold">{name}</h1>
            <p className="text-xs text-[#9a928d]">{username}</p>
          </div>

          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#75a8a5]">
            <div className="absolute inset-x-5 bottom-0 h-12 rounded-t-[50%] bg-white/90" />
            <div className="absolute left-1/2 top-3 h-10 w-9 -translate-x-1/2 rounded-full bg-[#9e694f]" />
          </div>
        </div>
      </div>
    </>
  );
}
