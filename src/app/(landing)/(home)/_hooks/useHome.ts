import type { getLandingHome } from "../_services/home.server";

type LandingHomeData = Awaited<ReturnType<typeof getLandingHome>>;

export default function getHomeViewData(data: LandingHomeData) {
  return {
    categories: data.categories.map((category) => ({
      id: String(category.id),
      title: category.name,
      icon: category.icon ?? "",
    })),
    eventCards: data.events.map((event) => ({
      id: String(event.id),
      slug: event.slug,
      title: event.title,
      description: event.description ?? "",
      image: event.image ?? "",
      weekday: "",
      day: new Intl.DateTimeFormat("fa-IR", { day: "2-digit" }).format(event.starts_at),
      month: new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(event.starts_at),
      timeRange: new Intl.DateTimeFormat("fa-IR", { timeStyle: "short" }).format(event.starts_at),
      location: event.restaurant?.name ?? "",
      remainingTime: "",
      isSaved: false,
    })),
    nearByCards: data.nearbyRestaurants.map((restaurant) => ({
      id: String(restaurant.id),
      title: restaurant.name,
      location: restaurant.address ?? restaurant.city ?? "",
      rating: String(restaurant.average_rating),
      image: restaurant.cover_image ?? "",
      category: restaurant.categories[0]?.name ?? "",
    })),
    PopularCards: data.popularRestaurants.map((restaurant) => ({
      id: String(restaurant.id),
      title: restaurant.name,
      location: restaurant.address ?? restaurant.city ?? "",
      rating: restaurant.average_rating,
      image: restaurant.cover_image ?? "",
      category: restaurant.categories[0]?.name ?? "",
      reviewsCount: restaurant.reviews_count,
    })),
    bloggerCards: data.bloggers.map((blogger) => ({
      id: String(blogger.id),
      name: blogger.display_name,
      username: `@${blogger.username}`,
      avatar: blogger.cover_image ?? "",
      role: blogger.title ?? "",
      reviewsCount: blogger.followers_count,
    })),
  };
}