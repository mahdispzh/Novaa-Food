export function transformEvents(event: {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  starts_at: Date;
  restaurant: { name: string } | null;
  registration_status?: number | null;
}) {
  return {
    id: String(event.id),
    slug: event.slug,
    title: event.title,
    description: event.description ?? "",
    image: event.cover_image ?? "",
    day: new Intl.DateTimeFormat("fa-IR", { day: "2-digit" }).format(
      event.starts_at,
    ),
    month: new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(
      event.starts_at,
    ),
    timeRange: new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(event.starts_at),
    location: event.restaurant?.name ?? "",
    isSaved: event.registration_status === 1,
  };
}
