// ui/cart-item-card.ui.tsx

"use client";

import Image from "next/image";
import { OfficerIcon } from "../../constants/icons/officer-icon";
import { RulerIcon } from "../../constants/icons/ruler-icon";
import { StoreIcon } from "../../constants/icons/store-icon";
import { VerifiedIcon } from "../../constants/icons/verified-icon";
import { Price, Text } from "../../ui";
import { QuantitySelector } from "../../ui/quantity-selector/quantity-selector.ui";
import { StyledButton } from "../../ui/styled-button/styled-button.ui";
import {
  getDiscountBadgeClass,
  SHIPPING_INFO,
} from "./cart-item-card.constants";
import { CartItemCardProps } from "./cart-item-card.types";
import { useCartItemCard } from "./useCartItemCard";

export function CartItemCard({
  id,
  title,
  imageSrc,
  color,
  colorHex,
  size,
  shippingMethod,
  price,
  discount,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const { imageUrl, handleImageError } = useCartItemCard(imageSrc);

  const hasDiscount = Boolean(discount && discount > 0);
  const discountBadgeClass = getDiscountBadgeClass(hasDiscount);

  return (
    <div className="flex h-68.75 w-120 flex-row gap-6">
      <div className="relative h-full w-55 flex-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 768px) 100vw, 220px"
          quality={80}
          onError={handleImageError}
          priority={false}
        />
      </div>
      <div className="flex w-full flex-3 flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <Text text={title} size="lg" weight="medium" />
          <div className="flex flex-col gap-1 border-y border-gray py-2">
            <div className="flex flex-row gap-1">
              <StoreIcon size="md" />
              <Text text={SHIPPING_INFO.storeName} size="sm" />
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                <RulerIcon size="md" />
                <Text text={size} size="sm" />
              </div>
              <div className="flex flex-row items-center gap-1">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colorHex }}
                ></div>
                <Text text={color} size="sm" />
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <VerifiedIcon size="md" />
              <Text text={SHIPPING_INFO.guarantee} size="sm" />
            </div>
            <div className="flex flex-row gap-1">
              <OfficerIcon size="md" />
              <Text text={shippingMethod} size="sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          {hasDiscount ? (
            <div className={discountBadgeClass}>
              <Text text={`${discount}%`} color="white" size="sm" />
            </div>
          ) : (
            <div></div>
          )}
          <Price
            price={price}
            size="lg"
            {...(discount && discount > 0 && { discount })}
          />
        </div>
        <div className="flex flex-row gap-2">
          <QuantitySelector
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            type="secondary"
            className="flex-5"
          />
          <div className="flex flex-2 items-end">
            <StyledButton variant="delete" action={onRemove} />
          </div>
        </div>
      </div>
    </div>
  );
}
