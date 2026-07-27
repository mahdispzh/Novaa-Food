"use client";

import type { InfoGridItemProps } from "@/src/app/dashboard/profile/_types/info-grid-item.types";
import { PencilIcon } from "@/src/shared/constants/icons/pencil-icon";
import { Text } from "@/src/shared/ui";

export function InfoGridItem({
  label,
  value,
  status,
  borderClassName = "",
  onEdit,
  icon,
}: InfoGridItemProps) {
  return (
    <div className={`menu-item-padding ${borderClassName}`}>
      <div className="relative flex items-start justify-between">
        <div className="gap-layout flex flex-col">
          <Text text={label} />
          <Text text={value} />
        </div>

        {status && (
          <div className="absolute top-0 z-[-1] flex w-full items-center justify-center">
            {/* <StatusBadge status={status} /> */}
          </div>
        )}

        <button type="button" onClick={onEdit} className="cursor-pointer">
          {icon ?? <PencilIcon size={"md"} />}
        </button>
      </div>
    </div>
  );
}
