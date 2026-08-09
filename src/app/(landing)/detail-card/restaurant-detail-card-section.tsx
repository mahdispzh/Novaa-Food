"use client";


import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import { RestaurantDetailCard as restaurantDetailCardData } from "./restaurant-detail-card-constant"
import RestaurantDetailCard from "./restaurant-detail-card";

export default function RestaurantDetailCardSection() {
  return (
    <section>
      <SectionHeading
        className="mt-5"
        title="سفارش پیشنهادی"
        subtitle="آیتم پیشنهادی ما را امتحان کنید."
      />

<div className="relative mt-6">
        {/* مستطیل بالا */}
        <div className="absolute -top-3 -right-4 h-9 w-36 rounded-md bg-secondary" />
        {/* مستطیل پایین */}
        <div className="absolute -bottom-5 right-40 h-10 w-40 rounded-md bg-secondary" />

        <div className="relative z-10 flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
          {restaurantDetailCardData.map((item) => (
            <RestaurantDetailCard
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}