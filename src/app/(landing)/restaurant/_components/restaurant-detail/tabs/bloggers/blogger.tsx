"use client";

import { bloggerCards } from "@/src/shared/ui/blogger-card/blogger-card-constant";
import BloggerCardSection from "@/src/shared/ui/blogger-card/blogger-card-section";
import SectionHeading from "@/src/shared/ui/section-heading/section-heading";
import BloggerRatingSection from "./blogger-rating/blogger-rating-section";
import { RestaurantBloggerProps } from "./blogger-type";
import { Button } from "@/src/shared/ui";
import BloggerVideoSection from "./blogger-video/blogger-video-section";

export default function RestaurantBlogger({
  discription,
  rating,
}: RestaurantBloggerProps) {

  return (
    <div className="flex flex-col">
      <BloggerCardSection data={bloggerCards} />
      {/* <SectionHeading
        title="ویدیو معرفی"
        subtitle="ویدیو معرفی کافه سام را مشاهده کنید."
        className="mt-5"
      /> */}

      <div className="border border-beige p-3 mt-7">
        <p className="text-[13px] font-light text-primary">{discription}</p>
      </div>

      <BloggerRatingSection />


      <BloggerVideoSection />

      
      <div className="mt-7 flex justify-center">
        <Button variant="primary" size="md" width="full" rounded="sm">
          <span className="text-[13px] font-medium">مشاهده پروفایل بلاگر</span>
        </Button>
      </div>


    </div>
  );
}
