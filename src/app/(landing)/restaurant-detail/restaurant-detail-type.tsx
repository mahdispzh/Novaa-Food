import { RestaurantIntroductionProps } from "./tabs/introduction/restaurant-introduction-type";

export interface RestaurantDetailProps {
  title: string;
  category: string;
  image: string;
  rating: string;
  reviewsCount: number;

  tabs: {
    id: string;
    title: string;
  }[];
  
}