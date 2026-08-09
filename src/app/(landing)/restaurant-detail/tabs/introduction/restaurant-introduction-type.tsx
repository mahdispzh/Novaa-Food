export interface RestaurantIntroductionProps {
  location: string;
  description: string;
  phone: string;
  address: string;
  workingHours: string;
  instagram: string;
  contactDescription: string;


  badges : {
    id:number;
    title:string;
  }[];
}