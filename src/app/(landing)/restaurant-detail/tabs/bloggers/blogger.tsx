"use client"

import { bloggerCards } from "@/src/shared/ui/blogger-card/blogger-card-constant"
import BloggerCardSection from "@/src/shared/ui/blogger-card/blogger-card-section"
import SectionHeading from "@/src/shared/ui/section-heading/section-heading"
import BloggerVideoSection from "./blogger-video/blogger-video-section"
import { RestaurantBloggerProps } from "./blogger-type"

export default function RestaurantBlogger({
    discription,
    rating,
}:RestaurantBloggerProps){
    console.log(discription);
    return(
        <div className="flex flex-col px-3">
            <BloggerCardSection data={bloggerCards} />
            <SectionHeading
            title="ویدیو معرفی"
            subtitle="ویدیو معرفی کافه سام را مشاهده کنید."
            />
            {/* <BloggerVideoSection /> */}

            <div className="border border-beige p-3">
                <p className="text-primary text-[13px] font-light ">{discription}</p>

            </div>

            

        </div>
    )
}