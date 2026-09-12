import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Link from "next/link";

interface CommentsCardProps {
  count?: number;
}

export function CommentsCard({ count }: CommentsCardProps) {
  return (
    <Link
      className="mt-4 flex min-h-16 w-full flex-col items-start justify-center gap-0.5 rounded-md border border-primary bg-beige px-4 text-right"
      href="/user/reviews"
    >
      <span className="flex w-full items-center justify-between gap-2 py-2 text-md font-medium">
        <span className="flex items-center gap-2">
          <ICONS.reviewIcon color="text-secondary" size="lg" />
          دیدگاه‌های من
        </span>
        {typeof count === "number" && (
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-normal text-gray-600">
            {count}
          </span>
        )}
      </span>
      <span className="text-xs py-2 text-gray-500">
        اینجا می‌توانید دیدگاه‌های ثبت‌شده خود را مشاهده و مدیریت کنید.
      </span>
    </Link>
  );
}