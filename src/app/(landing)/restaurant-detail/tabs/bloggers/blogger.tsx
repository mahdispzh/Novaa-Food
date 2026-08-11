"use client";

import { bloggerCards } from "@/src/shared/ui/blogger-card/blogger-card-constant";
import BloggerCardSection from "@/src/shared/ui/blogger-card/blogger-card-section";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import BloggerRatingSection from "./blogger-rating/blogger-rating-section";
import { RestaurantBloggerProps } from "./blogger-type";
import { Button } from "@/src/shared/ui";

export default function RestaurantBlogger({
  discription,
  rating,
}: RestaurantBloggerProps) {
  console.log(discription);
  return (
    <div className="flex flex-col px-3">
      <BloggerCardSection data={bloggerCards} />
      <SectionHeading
        title="ویدیو معرفی"
        subtitle="ویدیو معرفی کافه سام را مشاهده کنید."
      />
      {/* <BloggerVideoSection /> */}

      <div className="border border-beige p-3">
        <p className="text-[13px] font-light text-primary">{discription}</p>
      </div>
      <BloggerRatingSection />
      <Button
        className="absolute top-52 right-4"
        variant="primary"
        size="sm"
        width="medium"
        rounded="full"
      >
        <span className="font-regular text-[12px]">مشاهده پروفایل</span>
      </Button>
    </div>
  );
}
