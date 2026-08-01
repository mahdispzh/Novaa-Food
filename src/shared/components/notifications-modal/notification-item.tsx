"use client";

import { Text } from "../../ui";
import { NotificationItemProps } from "./notifications-modal.types";

const categoryColors: Record<NotificationItemProps["category"], string> = {
  order: "bg-success",
  favorite: "bg-danger",
  comment: "bg-primary",
  delivery: "bg-secondary",
};


export function NotificationItem({
  category,
  text,
  time,
  extraData,
  onRemove,
  id,
  isRead,
}: NotificationItemProps) {
  return (
    <div className="flex h-auto w-full flex-row items-start justify-between gap-2 bg-white p-3 hover:bg-accent/30">
      <div className="flex min-w-0 flex-1 flex-row items-start gap-2">
        <div
          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${categoryColors[category]}`}
        >
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <div className="flex w-full min-w-0 flex-row items-center gap-2">
            <div className="min-w-0 flex-1">
              <Text text={text} size="md" weight="regular" color="primary" />
            </div>
            {!isRead && (
              <span className="h-2 w-2 shrink-0 rounded-full bg-danger" />
            )}
          </div>
          <Text text={extraData} size="sm" weight="regular" color="secondary" />
          <Text text={time} size="sm" weight="regular" color="gray" />
        </div>
      </div>

      <button className="shrink-0 cursor-pointer" onClick={() => onRemove(id)}>
      </button>
    </div>
  );
}
