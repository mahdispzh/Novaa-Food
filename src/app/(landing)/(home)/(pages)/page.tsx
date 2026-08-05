// src/app/(landing)/(home)/page.tsx
import AppFooter from "@/src/shared/components/footer/AppFooter";
import CategoryCardSection from "../_components/category-card/category-card-section";
import EventCardSection from "../_components/event-card/event-card-section";
import NearByCardSection from "../_components/near-by-card/near-by-card-section";
import PopularCardSection from "../_components/popular-card/popular-card-section";
import BloggerCardSection from "@/src/shared/ui/blogger-card/blogger-card-section";

export default function HomePage() {
  
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main className="pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
          <CategoryCardSection />
          <EventCardSection/>
          <NearByCardSection/>
          <PopularCardSection/>
          <BloggerCardSection/>
          <AppFooter />
        </main>
      </body>
    </html>
  );
}