import RestaurantDetail from "./restaurant-detail";
import { restaurantDetailData } from "./restaurant-detail-constant";

export default function RestaurantPage() {
  return (
    <RestaurantDetail 
      {...restaurantDetailData}
    />
  );
}