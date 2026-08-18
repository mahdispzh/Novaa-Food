import { MapCardData } from "./map-card-constants";
import MapCards from "./map-cards";

export default function MapCardSection() {
  return (
    <div
    dir="ltr"
      className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-4"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {MapCardData.map((card) => (
        <div
          key={card.id}
          className="shrink-0"
          style={{ scrollSnapAlign: "end" }}
        >
          <MapCards key={card.id} {...card} />
        </div>
      ))}
    </div>
  );
}
