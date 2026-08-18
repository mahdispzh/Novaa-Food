import RestaurantDetail from "../_components/restaurant-detail/restaurant-detail";
import { restaurantDetailData } from "../_constants/restaurant-detail-constant";

export default function RestaurantPage() {
  return <RestaurantDetail {...restaurantDetailData} />;
}
