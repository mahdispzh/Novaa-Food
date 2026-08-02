// src/app/(landing)/(home)/page.tsx
import CategoryCardSection from "../_components/category-card-section";
import Footer from "@/src/shared/components/footer/base-footer";

export default function HomePage() {
  return (
    <main>
      <CategoryCardSection />
      <Footer />
    </main>
  );
}