// src/app/(landing)/(home)/page.tsx
import AppFooter from "@/src/shared/components/footer/AppFooter";
import CategoryCardSection from "../_components/category-card-section";

export default function HomePage() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main className="pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
          <CategoryCardSection />
          <AppFooter />
        </main>
      </body>
    </html>
  );
}