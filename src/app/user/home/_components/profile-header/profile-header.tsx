import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Image from "next/image";
import { ProfileStats } from "../profile-stats/profile-stats";

interface ProfileStat {
  label: string;
  value: string;
}

interface ProfileHeaderProps {
  name: string;
  id?: string | number;
  imageSrc?: string;
  stats: ProfileStat[];
}

export function ProfileHeader({
  name,
  id,
  imageSrc,
  stats,
}: ProfileHeaderProps) {
  return (
    <>
      <header className="flex items-center justify-start px-4 py-2">
        <button
          aria-label="بازگشت"
          className="flex h-10 w-10 items-center justify-center"
          type="button"
        >
          <ICONS.arrowRightIcon color="text-secondary" size="lg" />
        </button>
      </header>

      <div className="flex items-center gap-3 px-4 pt-1">
        <div className="relative h-25 w-25 shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                fill
                priority
                alt={`${name} profile image`}
                className="object-cover"
                src={imageSrc}
                />
            </div>

            <button
                aria-label="ویرایش تصویر پروفایل"
                className="absolute bottom-0 right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white"
                type="button"
            >
                <ICONS.editIcon color="text-white" size="sm" />
            </button>
            </div>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-baseline gap-10">
            <h1 className="text-lg font-bold">{name}</h1>
            {id !== undefined && (
              <span className="text-xs text-gray-500">{id}</span>
            )}
          </div>
          <ProfileStats stats={stats} />
        </div>
      </div>
    </>
  );
}