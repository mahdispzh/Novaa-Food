"use client";

import { DefaultButton, Price, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useWishlistCard } from "./useWishlistCard";
import { WishlistCardProps } from "./wishlist-card.types";

export function WishlistCard(props: WishlistCardProps) {
  const { title, imageSrc, price, discount, onRemoveFromWishlist } = props;
  const { handleViewProduct } = useWishlistCard(props);

  return (
    <div className={`flex h-100 w-[181.25px] flex-col justify-between`}>
      <div
        className="flex w-full cursor-pointer flex-col gap-3"
        onClick={handleViewProduct}
      >
        <div className="relative h-56.25 w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="h-auto w-full rounded-sm object-cover transition-transform hover:scale-105"
            quality={100}
          />
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <Text text={title} weight="medium" size="lg" />
          <Price
            price={price}
            size="lg"
            {...(discount !== undefined && { discount })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <DefaultButton
          type="primary"
          style="outline"
          label="مشاهده محصول"
          action={handleViewProduct}
        />
        <DefaultButton
          type="primary"
          style="fill"
          label="حذف از علاقه مندی ها"
          action={onRemoveFromWishlist ?? (() => {})}
        />
      </div>
    </div>
  );
}
