import { ICONS } from "@/src/shared/constants/dynamic-icon";
import Input from "@/src/shared/ui/search-input/Input";
import MapCardSection from "../_components/map-cards/map-cards-section";
import Map from "../_components/map/map-loader";
import Main from "@/src/shared/ui/main/main";

const { searchIcon: SearchIcon } = ICONS;

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      <Map />
      <div className="absolute top-5 right-4 w-[380px] max-w-[625px]">
        <Input
          inputSize="mapSize"
          leftIcon={<SearchIcon color="text-gray" size="md" />}
          placeholder="جستجو"
          rounded="full"
          variant="filled"
        />
      </div>
      <div className="absolute bottom-4 w-full">
        <MapCardSection />
      </div>
    </div>
  );
}
