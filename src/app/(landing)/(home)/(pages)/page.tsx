// src/app/(landing)/(home)/page.tsx
import AppFooter from "@/src/shared/components/footer/AppFooter";
import CategoryCardSection from "../_components/category-card-section";
import { Main } from "@/src/shared/ui";

export default function HomePage() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Main>
          <CategoryCardSection />
          <AppFooter />
        </Main>
      </body>
    </html>
  );
}