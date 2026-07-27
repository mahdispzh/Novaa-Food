// صفحه: dashboard/profile/comments/AddProductModal.tsx

import Image from "next/image";

import { Caption, Price, Text } from "@/src/shared/ui";

import { CommentedProductType } from "@/src/app/dashboard/comments/_types/product-comments.types";
import { StoreIcon } from "@/src/shared/constants/icons/store-icon";
import { VerifiedIcon } from "@/src/shared/constants/icons/verified-icon";

interface CommentedProductCardProps {
  product: CommentedProductType;
}

export function CommentedProductCard({ product }: CommentedProductCardProps) {
  return (
    <div className="flex w-[340px] flex-shrink-0 flex-col justify-between rounded-sm bg-accent">
      <div className="flex">
        <div className="h-[220px] w-[160px] overflow-hidden rounded-bl">
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={220}
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-1 flex-col px-6">
          <div className="flex flex-col gap-2 border-b-2 border-gray py-6">
            <Text text={product.title} size="md" weight="bold" />

            <Text text={product.variant} size="sm" />
          </div>

          <div className="flex flex-col gap-3 py-6">
            <div className="flex items-center gap-2">
              <StoreIcon size="md" />

              <Caption text={product.storeName} size="2xs" weight="bold" />
            </div>

            <div className="flex items-center gap-2">
              <VerifiedIcon size="md" />

              <Caption text={product.guarantee} size="2xs" weight="bold" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 px-6 py-6">
        <Price price={product.price} />

        <button className="w-full rounded-xs bg-secondary py-2 text-sm text-white transition-all duration-200 hover:opacity-90">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
