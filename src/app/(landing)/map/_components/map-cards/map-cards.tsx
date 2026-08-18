import { ICONS } from "@/src/shared/constants/dynamic-icon";
import mapCardShape from "@/src/shared/ui/assets/shapes/map-card.svg";
import Image from "next/image";

export default function MapCards(){
    return(
        <div className="relative h-[480px] w-full">
      {/* Shape */}
      <Image src={mapCardShape} alt="" className="object-contain" width={200} height={650}/>
        </div>
    )
}