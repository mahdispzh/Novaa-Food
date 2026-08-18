import Map from "./";
import MapCardSection from "../_components/map-cards/map-cards-section";

export default function Page() {
  return (
    <main className="relative h-screen w-full">
      <Map />

      <div className="absolute bottom-4 w-full">
        <MapCardSection />
      </div>
    </main>
  );
}