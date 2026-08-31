export function transformRestaurantToPopularCard(restaurant: any) {
  return {
    id: restaurant.id,
    title: restaurant.name,
    category: restaurant.categories[0]?.name || "",
    image: restaurant.cover_image || "/placeholder-image.jpg",
    rating: restaurant.average_rating ?? 0,
    reviewsCount: restaurant.reviews_count ?? 0,
    location: [restaurant.city, restaurant.address].filter(Boolean).join("، "),
  };
}