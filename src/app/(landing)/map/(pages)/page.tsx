import SearchInput from "@/src/shared/ui/search-input/Input";
import MapCardSection from "../_components/map-cards/map-cards-section";
import Map from "../_components/map/map-loader";

export default function Page() {
  return (
    <main className="relative h-screen w-full">
      <Map />
      <div className="absolute  top-7 right-5">
        <SearchInput
          variant="outline"
          inputSize="mapSize"
          rounded="full"
        />
      </div>
      <div className="absolute bottom-4 w-full">
        <MapCardSection />
      </div>
    </main>
  );
}
