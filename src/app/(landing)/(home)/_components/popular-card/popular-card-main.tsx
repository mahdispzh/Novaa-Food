import PopularCardSection from "./popular-card-section";
import { getLandingHome } from "../../_services/home.server";
import { transformRestaurantToPopularCard } from "./popular-card-transformer";

export default async function PopularCardMain() {
  const { popularRestaurants } = await getLandingHome();
  const cards = popularRestaurants.map(transformRestaurantToPopularCard);

  return <PopularCardSection data={cards} />;
}