import { StaticImageData } from "next/image";
import { ReactNode } from "react";


export interface nearByCardProps {
  title: string;
  location: string;
  rating: number;
  image: StaticImageData;
  category: string;

}