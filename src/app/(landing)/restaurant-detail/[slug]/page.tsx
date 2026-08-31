import { notFound } from "next/navigation";

import { getRestaurantDetail } from "../_services/restaurant-detail.server";
import RestaurantDetail from "../restaurant-detail";

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = await getRestaurantDetail(slug);

  if (!restaurant) notFound();

  return (
    <RestaurantDetail
      category={restaurant.categories[0]?.name ?? ""}
      image={restaurant.cover_image ?? ""}
      rating={String(restaurant.average_rating)}
      reviewsCount={restaurant.reviews_count}
      tabs={[]}
      title={restaurant.name}
    />
  );
}
