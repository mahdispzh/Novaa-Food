"use client";

import Main from "@/src/shared/ui/main/main";
import ReviewCard from "../_components/review-card/review-card";
import { ReviewsHeader } from "../_components/reviews-header/reviews-header";
import type { Review } from "../_types/reviews.types";

const reviews: Review[] = [
  {
    id: 1,
    businessName: "کافه تیرا",
    status: "published",
    rating: 5,
    date: "شنبه ۱۲ مرداد",
    text: "ممنون از شما بابت غذای خوب و پرسنل خوش برخورد و حرفه ای. غذا خوشمزه بود و همه چیز عالی بود.",
    response: {
      authorLabel: "پاسخ صاحب کسب‌وکار",
      text: "نوش جان، ممنون و سپاسگزاریم.",
    },
  },
  {
    id: 2,
    businessName: "رستوران خانه سبز",
    status: "published",
    rating: 4,
    date: "دوشنبه ۹ مرداد",
    text: "محیط آرام و غذای باکیفیتی داشت. برخورد کارکنان هم بسیار خوب بود.",
    response: {
      authorLabel: "پاسخ صاحب کسب‌وکار",
      text: "از نظر ارزشمند شما ممنونیم. خوشحالیم که راضی بودید.",
    },
  },
  {
    id: 3,
    businessName: "بیکری نان تازه",
    status: "pending",
    rating: 3,
    date: "پنجشنبه ۵ مرداد",
    text: "طعم نان‌ها خوب بود، اما زمان آماده شدن سفارش کمی طولانی شد.",
  },
];

export default function ReviewsPage() {
  return (
    <Main
      hideFooter
      className="h-screen overflow-y-auto bg-light-beige px-4 py-4 text-secondary"
    >
      <ReviewsHeader title="دیدگاه‌های من" />
      <div className="mt-2 flex flex-col">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </Main>
  );
}
