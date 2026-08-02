import NearByCard from "@/src/shared/ui/near-by-card/near-by-card";
import nearByCardImage from "@/src/shared/ui/near-by-card/near-by-card-image.svg";

export default function HomePage() {
  return (
    <main className="p-8">
      <NearByCard
        title="سام کافه"
        category="کافه"
        icon="☕"
        image={nearByCardImage}
        rating={4.8}
        location="شیراز، ارم"
      />
    </main>
  );
}