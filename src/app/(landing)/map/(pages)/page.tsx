import { MapCardData } from "../_components/map-cards/map-card-constants";
import MapCards from "../_components/map-cards/map-cards";

export default function MapPage() {
  return (
    <div className="flex gap-3 overflow-x-auto p-4">
      {MapCardData.map((card) => (
        <MapCards key={card.id} {...card} />
      ))}
    </div>
  );
}