// src/.../_utils/restaurant-detail-transformer.ts

export function toRestaurantDetailProps(raw: any) {
  return {
    title: raw.name,
    image: raw.cover_image,
    rating: raw.average_rating,
    reviewsCount: raw.reviews_count,
    category: raw.categories[0]?.category.name ?? "",
  };
}