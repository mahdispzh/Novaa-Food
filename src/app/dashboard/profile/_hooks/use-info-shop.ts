import { DEFAULT_SHOP } from "@/src/app/dashboard/profile/_constants/info-shop";
import { useState } from "react";

export function useShop() {
  const [shop, setShop] = useState(DEFAULT_SHOP);

  return {
    shop,
    setShop,
  };
}
