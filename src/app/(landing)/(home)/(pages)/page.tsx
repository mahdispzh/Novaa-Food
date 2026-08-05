import BloggerCard from "@/src/shared/ui/blogger-card/blogger-card";
import NearByCardSection from "../_components/near-by-card/near-by-card-section";
import PopularCardSection from "../_components/popular-card/popular-card-section";
import EventCardSection from "../_components/event-card/event-card-section";
import CategoryCardSection from "../_components/category-card/category-card-section";
import BloggerCardSection from "@/src/shared/ui/blogger-card/blogger-card-section";

export default function HomePage() {
  return (
    <main>
      <CategoryCardSection />
      <EventCardSection />
      <NearByCardSection />
      <PopularCardSection/>
      <BloggerCardSection/>
    </main>
  );
}
