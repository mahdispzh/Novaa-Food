"use client";
import "@neshan-maps-platform/ol/ol.css";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import { RestaurantMapProps } from "./map-types";

const SHIRAZ_CENTER = { latitude: 29.6116, longitude: 52.5386 };

export default function Map({
  center = SHIRAZ_CENTER,
  zoom = 14,
}: RestaurantMapProps) {
  return (
    <NeshanMap
      mapKey={process.env.NEXT_PUBLIC_NESHAN_MAP_KEY as string}
      defaultType="neshan"
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
      poi={false}
      traffic={false}
    />
  );
}