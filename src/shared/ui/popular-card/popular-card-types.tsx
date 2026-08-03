import { StaticImageData } from "next/image";


export interface popularCardProps {
  title: string;
  location: string;
  rating: number;
  image: StaticImageData;
  category: string;

}