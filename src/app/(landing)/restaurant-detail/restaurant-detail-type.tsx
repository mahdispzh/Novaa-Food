export interface RestaurantDetailProps {
  title: string;
  category: string;
  image: string;
  rating: string;
  location: string;
  description: string;
  reviewsCount: number;
  phone: string;
  address: string;
  workingHours: string;
  instagram: string;
  contactDescription: string;

  tabs: {
    id: number;
    title: string;
  }[];

  badges : {
    id:number;
    title:string;
  }[];
}