import SearchInput from "@/src/shared/ui/search-input/Input";
import MapCardSection from "../_components/map-cards/map-cards-section";
import Map from "../_components/map/map-loader";
import Input from "@/src/shared/ui/search-input/Input";
import { ICONS } from "@/src/shared/constants/dynamic-icon";

const {
searchIcon : SearchIcon,
} = ICONS;

export default function Page() {
  return (
    <main className="relative h-screen w-full">
      <Map />
<div className="absolute top-5 right-4 w-[380px] max-w-[625px]">
  <Input
    inputSize="mapSize"
    variant="outline"
    rounded="full"
    placeholder="جستجو"
    leftIcon={<SearchIcon size="md" color="text-gray" />}
  />
</div>
      <div className="absolute bottom-4 w-full">
        <MapCardSection />
      </div>
    </main>
  );
}
