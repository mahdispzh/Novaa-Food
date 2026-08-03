// src/app/(landing)/(home)/(pages)/[map]/page.tsx
import AppFooter from "@/src/shared/components/footer/AppFooter";

export default function MapPage() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main className="pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-[calc(6.5rem+env(safe-area-inset-bottom))]">
          <AppFooter />
        </main>
      </body>
    </html>
  );
}