import BloggerCardSection from "@/src/shared/ui/blogger-card/blogger-card-section";
import Main from "@/src/shared/ui/main/main";
import CategoryCardSection from "../_components/category-card/category-card-section";
import EventCardSection from "../_components/event-card/event-card-section";
import NearByCardSection from "../_components/near-by-card/near-by-card-section";
import PopularCardSection from "../_components/popular-card/popular-card-section";
import useHome from "../_hooks/useHome";

export default function HomePage() {
  const {
    categories,
    eventCards,
    nearByCards,
    PopularCards,
    bloggerCards,
  } = useHome();

  return (
    <Main>
      <CategoryCardSection data={categories} />
      <EventCardSection data={eventCards} />
      <NearByCardSection data={nearByCards} />
      <PopularCardSection data={PopularCards} />
      <BloggerCardSection data={bloggerCards} />
    </Main>
  );
}