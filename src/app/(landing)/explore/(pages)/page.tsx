// src/app/layout.tsx
import AppFooter from "@/src/shared/components/footer/AppFooter";

export default function ExplorePage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
        <AppFooter />
      </body>
    </html>
  );
}