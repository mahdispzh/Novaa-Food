export function transformRestaurantToNearByCard(restaurant: any) {
  return {
    id: restaurant.id,
    title: restaurant.name,
    category: restaurant.categories[0]?.name || "",
    image: restaurant.cover_image || "/placeholder-image.jpg",
    rating: String(restaurant.average_rating ?? 0),
    location: [restaurant.city, restaurant.address].filter(Boolean).join("، "),
  };
}