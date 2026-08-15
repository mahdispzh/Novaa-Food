export interface RestaurantReviewProps {
  rating: number;
  reviewsCount: number;
  reviews: Review[];
   onReviewClick: () => void;
}

export interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
}