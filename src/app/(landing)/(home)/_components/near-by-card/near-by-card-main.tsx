import NearByCardSection from "./near-by-card-section";
import { getLandingHome } from "../../_services/home.server";
import { transformRestaurantToNearByCard } from "./near-by-card-transformer";

export default async function NearByCardMain() {
  const { nearbyRestaurants } = await getLandingHome();
  const cards = nearbyRestaurants.map(transformRestaurantToNearByCard);

  return <NearByCardSection data={cards} />;
}