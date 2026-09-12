import { CalendarIcon } from "@/src/shared/constants/icons/calendar-icon";
import { DiscountBoxIcon } from "@/src/shared/constants/icons/discount-box-icon";
import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";
import { OrderIcon } from "@/src/shared/constants/icons/order-icon";
import { ReturnIcon } from "@/src/shared/constants/icons/return-icon";
import { TicketIcon } from "@/src/shared/constants/icons/ticket-icon";
import { Text } from "@/src/shared/ui";
import Image from "next/image";

interface Props {}
// TODO checked component
export function OrderCardReturned({}: Props) {
  const orderInfo = [
    { icon: CalendarIcon, text: "۵ اردیبهشت ۱۴۰۵" },
    { icon: OrderIcon, text: "کد سفارش: ۶۵۴۳۷۸۲" },
    { icon: TicketIcon, text: "مبلغ: ۶,۸۹۰,۰۰۰" },
    { icon: DiscountBoxIcon, text: "تخفیف: ۱,۲۰۰,۰۰۰" },
  ];

  function OrderInfoItem({ icon: Icon, text }: any) {
    return (
      <div className="flex items-center gap-1">
        <Icon color="text-gray" size="sm" />
        <Text text={text} size="sm" weight="regular" />
      </div>
    );
  }

  const productImages = [
    "./images/image31.svg",
    "./images/image31.svg",
    "./images/image31.svg",
  ];

  function ProductImages() {
    return (
      <div className="gap-layout flex">
        {productImages.map((src, i) => (
          <Image key={i} src={src} alt="product" width={67} height={84} />
        ))}
      </div>
    );
  }

  return (
    <div className="menu-item-border flex flex-col">
      {/* header */}
      <div className="menu-item-padding flex items-center border-b-2 border-gray">
        <div className="flex items-center gap-1">
          <ReturnIcon size="sm" color="text-danger" />
          <Text text="مرجوع شده" size="md" weight="medium" />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col">
        {/* order info */}
        <div className="gap-layout menu-item-padding flex flex-col items-start">
          <div className="gap-layout flex flex-wrap">
            {orderInfo.map((item, i) => (
              <OrderInfoItem key={i} {...item} />
            ))}
          </div>

          {/* images */}
          <ProductImages />

          {/* action */}
          <div className="flex w-full cursor-pointer justify-end gap-2">
            <Text
              text="مشاهده ی فاکتور"
              size="md"
              weight="regular"
              color="danger"
            />
            <DropleftArrowIcon size="xs" color="text-danger" />
          </div>
        </div>
      </div>
    </div>
  );
}
