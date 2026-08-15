"use client";

import { ICONS } from "@/src/shared/constants/dynamic-icon";
import { Button } from "@/src/shared/ui";
import BloggerCard from "./blogger-card";
import { bloggerCards } from "./blogger-card-constant";

type BloggerSectionProps = {
  data: any[];
};

const { sparkleIcon: SparkleIcon,
  chevronlefticon:ChevronLeftIcon
 } = ICONS;

export default function BloggerCardSection({data}:BloggerSectionProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">

      <div
        className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {data.map((blogger) => (
          <div
            key={blogger.id}
            className="shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <BloggerCard
              name={blogger.name}
              username={blogger.username}
              avatar={blogger.avatar}
              role={blogger.role}
              reviewsCount={blogger.reviewsCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
}