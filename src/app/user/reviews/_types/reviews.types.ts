// types.ts

/** Status badge shown on a review card. */
export type ReviewStatus = "published" | "pending";

/** The business owner's reply to a review. */
export interface ReviewResponse {
  /** Label for who is replying, e.g. "پاسخ صاحب کسب‌وکار" */
  authorLabel: string;
  /** The reply text itself */
  text: string;
}

/** A single review record rendered by <ReviewCard />. */
export interface Review {
  id: string | number;
  /** Name of the place being reviewed, e.g. "کافه تیارا درمورد دیدگاه" */
  businessName: string;
  /** Star rating, 0–5 (can be fractional, e.g. 4.5) */
  rating: number;
  /** Max stars to render (defaults to 5) */
  maxRating?: number;
  status: ReviewStatus;
  /** Pre-formatted display date, e.g. "شنبه ۱۲ مرداد" */
  date: string;
  /** Main body of the review */
  text: string;
  /** Optional business-owner response rendered in the highlighted box */
  response?: ReviewResponse;
}

export interface ReviewCardProps {
  review: Review;
  /** Called when the card is clicked/tapped (optional) */
  onClick?: (review: Review) => void;
  className?: string;
}