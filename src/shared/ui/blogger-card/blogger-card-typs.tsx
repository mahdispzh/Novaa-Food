
import { StaticImageData } from "next/image";

export interface BloggerCardProps {
  name: string;
  username?: string;
  avatar: StaticImageData | string;
  // isVerified?: boolean;
  role: string;
  reviewsCount: number;
}