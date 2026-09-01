import { CalendarIcon } from "@/src/shared/constants/icons/calendar-icon";
import { DiscountBoxIcon } from "@/src/shared/constants/icons/discount-box-icon";
import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";
import { OrderIcon } from "@/src/shared/constants/icons/order-icon";
import { TicketIcon } from "@/src/shared/constants/icons/ticket-icon";
import { Text } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";

interface Props {
  status: string;
  statusIcon: React.ElementType;
  orderId?: string; // ✅ اضافه شد
}

export function OrderCardDelivered({ status, statusIcon: StatusIcon, orderId = "1" }: Props) {
  const orderMeta = [
    { icon: CalendarIcon, text: "۵ اردیبهشت ۱۴۰۵" },
    { icon: OrderIcon, text: "کد سفارش: ۶۵۴۳۷۸۲" },
    { icon: TicketIcon, text: "مبلغ: ۶,۸۹۰,۰۰۰" },
    { icon: DiscountBoxIcon, text: "تخفیف: ۱,۲۰۰,۰۰۰" },
  ];

  return (
    <div className="menu-item-border flex flex-col">
      {/* header */}
      <div className="menu-item-padding flex items-center justify-between border-b-2 border-gray">
        <div className="flex items-center gap-2">
          <div className="rounded-full border-2 border-success p-[2px]">
            <StatusIcon size="xs" color={"text-success"} />
          </div>
          <Text text={status} size="md" weight="medium" />
        </div>
        <Link href={`/profile/orders/${orderId}`}>
          <DropleftArrowIcon size="md" color="text-danger" />
        </Link>
      </div>

      {/* content */}
      <div className="menu-item-padding gap-layout flex flex-col">
        {/* meta */}
        <div className="gap-layout flex flex-wrap">
          {orderMeta.map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <item.icon size="sm" color="text-gray" />
              <Text text={item.text} size="sm" />
            </div>
          ))}
        </div>

        {/* images */}
        <div className="gap-layout flex">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Image
                key={i}
                src="./images/image31.svg"
                alt="product"
                width={67}
                height={84}
                className="rounded-xs"
              />
            ))}
        </div>

        {/* action */}
        <Link
          href={`/profile/orders/${orderId}/invoice`}
          className="flex cursor-pointer items-center justify-end gap-2"
        >
          <Text text="مشاهده ی فاکتور" size="md" color="danger" />
          <DropleftArrowIcon size="xs" color="text-danger" />
        </Link>
      </div>
    </div>
  );
}