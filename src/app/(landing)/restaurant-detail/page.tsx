import RestaurantDetail from "../restaurant/_components/restaurant-detail/restaurant-detail";
import { getRestaurantDetail } from "./_services/restaurant-detail.server";
import { notFound } from "next/navigation";

export default async function RestaurantPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
  const { slug } = await searchParams;
  if (!slug) notFound();
  const restaurant = await getRestaurantDetail(slug);
  if (!restaurant) notFound();

  return (
    <RestaurantDetail 
      title={restaurant.name}
      category={restaurant.categories[0]?.name ?? ""}
      image={restaurant.cover_image ?? ""}
      rating={String(restaurant.average_rating)}
      reviewsCount={restaurant.reviews_count}
      tabs={[]}
    />
  );
}