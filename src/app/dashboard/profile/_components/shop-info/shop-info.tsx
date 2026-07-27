"use client";

import Image from "next/image";

import { Text } from "@/src/shared/ui";

import { InfoShopType } from "@/src/app/dashboard/profile/_types/info-shop.type";
import { ShopContactInfo } from "./shop-contact-info";
import { ShopHeader } from "./shop-header";

interface Props {
  shop: InfoShopType;
  onEdit: () => void;
}

export function ShopInfo({ shop, onEdit }: Props) {
  return (
    <div className="menu-item-padding menu-item-border gap-layout flex h-full flex-col justify-between">
      <div className="gap-layout flex flex-col">
        <ShopHeader name={shop.name} onEdit={onEdit} />

        <Text
          size="lg"
          color="primary"
          weight="regular"
          text={shop.description}
        />
      </div>

      <div className="flex justify-between">
        <ShopContactInfo
          phone={shop.phone}
          address={shop.address}
          email={shop.email}
        />

        <Image src={shop.logoUrl} alt={shop.name} width={391} height={141} />
      </div>
    </div>
  );
}
