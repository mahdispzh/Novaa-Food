import PopularCard from "@/src/shared/ui/popular-card/popular-card";
import popularCardImage from "@/src/shared/ui/near-by-card/near-by-card-image.svg";

export default function HomePage() {
  return (
    <main className="p-8">
      <PopularCard
        title="فست‌فود لاوا"
        category="فست‌فود"
        icon="☕"
        image={popularCardImage}
        rating={4.8}
        location="شیراز، ارم"
      />
    </main>
  );
}