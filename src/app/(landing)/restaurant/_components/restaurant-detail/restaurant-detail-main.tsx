// restaurant-detail-main.tsx

import RestaurantDetail from "./restaurant-detail";
import { getRestaurantDetail } from "../../../restaurant-detail/_services/restaurant-detail.server";
import { toRestaurantDetailProps } from "./restaurant-detail-transformer";
import { RestaurantDetailTabs } from "../../_types/restaurant-detail-type";

export default async function RestaurantDetailMain({ slug }: { slug: string }) {
  const raw = await getRestaurantDetail(slug);

  if (!raw) {
    return <div>رستوران پیدا نشد</div>;
  }

  const data = toRestaurantDetailProps(raw);

  return <RestaurantDetail {...data} tabs={RestaurantDetailTabs} />;
}
